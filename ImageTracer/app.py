from fastapi import FastAPI
import requests
from typing import Optional
import os

app = FastAPI()

MAPBOX_TOKEN = os.environ.get("MAPBOX_ACCESS_TOKEN")


@app.get("/directions")
def get_directions(coordinate_list: Optional[list] = None):
    if coordinate_list is None:
        return {"error": "No coordinates provided"}
    else:
        coordinates = ";".join([f"{c[0]},{c[1]}" for c in coordinate_list])

    url = f"https://api.mapbox.com/directions/v5/mapbox/walking/{coordinates}?access_token={MAPBOX_TOKEN}"

    try:
        response = requests.get(url)
        return response.json()
    except Exception as e:
        print(e)
        return {"error": "An error occurred"}
