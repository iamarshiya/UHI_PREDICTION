from flask import Flask,request,jsonify
import joblib

from gee_engine import extract
from locality import add_locality
from livability import compute
from analytics import enrich_dataframe

app = Flask(__name__)

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

    print("COLUMNS:", df.columns)

    df["prediction"] = model.predict(df[FEATURES])

    df = compute(df)

    # Add real-time machine learning analytics
    df = enrich_dataframe(df, model, FEATURES)

    df = add_locality(df)
    
    features = df_to_geojson(df, "all_points")

    return jsonify({
        "type": "FeatureCollection",
        "city": city,
        "features": features
    })

if __name__=="__main__":
    app.run(debug=False)