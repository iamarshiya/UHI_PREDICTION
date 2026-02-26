from flask import Flask,request,jsonify
from flask_cors import CORS
import joblib
import os

from gee_engine import extract
from locality import add_locality
from livability import compute
from analytics import enrich_dataframe
from map_generator import generate_current_heatmap, generate_future_heatmap

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Urban Heat Island AI Backend Running"

def df_to_geojson(df, category):
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

model = joblib.load("uhi_model.pkl")

FEATURES = [
"NDVI","NDBI","EVI","SAVI","Albedo",
"MNDWI","IBI","Elevation","Slope","NightLights"
]

@app.route("/analyze")
def analyze():
    city = request.args.get("city")
    df = extract(city)
    df["prediction"] = model.predict(df[FEATURES])
    df = compute(df)
    df = enrich_dataframe(df, model, FEATURES)
    df = add_locality(df)
    
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
        top_10 = []
        bottom_10 = []
        
    features = df_to_geojson(df, "all_points")

    return jsonify({
        "type": "FeatureCollection",
        "city": city,
        "rankings": {
            "most_livable": top_10,
            "least_livable": bottom_10
        },
        "features": features
    })

@app.route("/generate-maps")
def generate_maps():
    city = request.args.get("city", "Pune")
    df = extract(city)
    df["prediction"] = model.predict(df[FEATURES])
    df = compute(df)
    df = enrich_dataframe(df, model, FEATURES)
    
    current_map_html = generate_current_heatmap(df, city)
    future_map_html = generate_future_heatmap(df, city)
    
    return jsonify({
        "current_map": current_map_html,
        "future_map": future_map_html
    })

if __name__=="__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="127.0.0.1", port=port, debug=False)