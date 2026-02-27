import requests
import ee
import os

ee.Initialize(project="project-8dd5a2c6-c802-4fd1-8eb")

API_KEY = "AIzaSyDLJ41jOwhZCitWvqc7ot8UAPsvGVTxq4o"

def get_roi(city):

    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={city},India&key={API_KEY}"

    response = requests.get(url)
    data = response.json()

    if data["status"] != "OK":
        raise Exception(f"Geocoding failed: {data['status']}")

    location = data["results"][0]["geometry"]["location"]

    lat = location["lat"]
    lon = location["lng"]

    roi = ee.Geometry.Point([lon, lat]).buffer(25000)

    return roi