from flask import Flask,request,jsonify
import joblib

from gee_engine import extract
from locality import add_locality
from livability import compute

app = Flask(__name__)

@app.route("/")
def home():
    return "Urban Heat Island AI Backend Running"

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

    df = add_locality(df)

    df = compute(df)

    top10 = df.sort_values("livability",ascending=False).head(10)
    worst10 = df.sort_values("livability").head(10)

    return jsonify({
        "city":city,
        "top_livable":top10.to_dict(),
        "worst_livable":worst10.to_dict()
    })

if __name__=="__main__":
    app.run(debug=False)