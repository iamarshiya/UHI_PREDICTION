import os
import joblib
import pandas as pd
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Import custom project modules
from gee_engine import extract
from city_to_roi import initialize_ee
from locality import add_locality
from livability import compute
from analytics import enrich_dataframe

print("PROGRAM STARTED")

# 1. Initialize Flask and serve the React 'build' folder
# Dockerfile puts build at /app/build and runs main.py from /app/backend
app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)

# 2. Initialize Earth Engine with Service Account credentials
initialize_ee()

# 3. Load and Patch ML Model for Cloud Run (CPU-only environment)
def patch_model(model_obj):
    """Bypasses XGBoost 'gpu_id' AttributeError on CPU environments."""
    if not hasattr(model_obj, 'gpu_id'):
        model_obj.gpu_id = None
    return model_obj

try:
    model = joblib.load("uhi_model.pkl")
    model = patch_model(model)
    print("MODEL LOADED AND PATCHED")
except Exception as e:
    print(f"ERROR LOADING MODEL: {e}")

# Define the features exactly as expected by your trained model
FEATURES = [
    "NDVI", "NDBI", "EVI", "SAVI", "Albedo",
    "MNDWI", "IBI", "Elevation", "Slope", "NightLights"
]

# --- FRONTEND ROUTES ---

@app.route("/")
def serve():
    """Serves the main React application."""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    """Serves static files (JS, CSS, Images) for React."""
    return send_from_directory(app.static_folder, path)

# --- API ROUTES ---

@app.route("/api/status")
def status():
    return jsonify({"status": "Urban Heat Island AI Backend Running"})

def df_to_geojson(df, category):
    """Helper to convert the processed DataFrame to GeoJSON format for the map."""
    features = []
    for _, row in df.iterrows():
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [row["lon"], row["lat"]]
            },
            "properties": {k: v for k, v in row.items() if k not in ["lat", "lon"]}
        }
        feature["properties"]["category"] = category
        features.append(feature)
    return features

@app.route("/analyze")
def analyze():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400
        
    try:
        # Step 1: Extract satellite data from GEE
        df = extract(city)
        
        # Step 2: Run predictions
        df["prediction"] = model.predict(df[FEATURES])
        
        # Step 3: Compute secondary indices and enrich data
        df = compute(df)
        df = enrich_dataframe(df, model, FEATURES)
        df = add_locality(df)
        
        # Step 4: Generate rankings by locality
        if "locality" in df.columns:
            locality_summary = df.groupby("locality").agg({
                "risk": "mean",
                "resilience_score": "mean",
                "green_deficit": "mean",
                "livability_index": "mean"
            }).reset_index()
            
            top_10 = locality_summary.sort_values("livability_index", ascending=False).head(10).to_dict(orient="records")
            bottom_10 = locality_summary.sort_values("livability_index", ascending=True).head(10).to_dict(orient="records")
        else:
            top_10, bottom_10 = [], []
            
        return jsonify({
            "type": "FeatureCollection",
            "city": city,
            "rankings": {
                "most_livable": top_10,
                "least_livable": bottom_10
            },
            "features": df_to_geojson(df, "all_points")
        })

    except Exception as e:
        print(f"ANALYSIS ERROR: {e}")
        return jsonify({"error": str(e)}), 500

# --- SERVER START ---

if os.name == "__main__":
    # Cloud Run provides the PORT environment variable
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=False)