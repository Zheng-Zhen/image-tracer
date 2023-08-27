import os
from typing import Optional

import httpx # for proxying mapbox tiles
import dotenv
import requests
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

# get env variables
env_path = os.path.join(os.path.dirname(__file__), "conf", ".env")
dotenv.load_dotenv(dotenv_path=env_path)
MAPBOX_TOKEN = os.environ.get("MAPBOX_ACCESS_TOKEN")

# set up app
app = FastAPI()

# set up CORS
origins = [
    "http://localhost:5500",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/directions")
def get_directions(coordinate_list: Optional[list] = None):
    if coordinate_list is None:
        return {"error": "No coordinates provided"}
    else:
        coordinates = ";".join([f"{c[0]},{c[1]}" for c in coordinate_list])

    url = f"https://api.mapbox.com/directions/v5/mapbox/walking/{coordinates}?access_token={MAPBOX_TOKEN}"

    try:
        response = requests.get(url)
        reponse_json = response.json()
        data = reponse_json.routes[0]
        route = data.geometry.coordinates
        return route
    except Exception as e:
        print(e)
        return {"error": "An error occurred"}

@app.get("/map/{path:path}")
async def mapbox_proxy(request: Request):
    # redirect to mapbox api, with token
    mapbox_base_url = f"https://api.mapbox.com/"
    forwarded_headers = {
        header: value for header, value in request.headers.items() if header.lower() != "host"
    }
    # add token to params
    # create new params dict
    params = request.query_params._dict
    params["access_token"] = MAPBOX_TOKEN
    # get endpoint
    url = mapbox_base_url + request.path_params["path"]

    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            params=params,
            headers={"Authorization": f"Bearer {MAPBOX_TOKEN}", **forwarded_headers},
        )
        return Response(content=response.content, media_type=response.headers.get("content-type", None))

    # TODO: add token verification

