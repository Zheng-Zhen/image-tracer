from fastapi import FastAPI
import requests
from typing import Optional

app = FastAPI()

MAPBOX_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN"


@app.get("/directions")
def get_directions(start: Optional[str] = None, end: Optional[str] = None):
    url = f"https://api.mapbox.com/directions/v5/mapbox/walking/{start};{end}?access_token={MAPBOX_TOKEN}"

    try:
        response = requests.get(url)
        return response.json()
    except Exception as e:
        print(e)
        return {"error": "An error occurred"}
