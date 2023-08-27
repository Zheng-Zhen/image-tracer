mapboxgl.config.API_URL = 'http://localhost:23333/map';

function initializeMap() {
    const map = new mapboxgl.Map({
        accessToken: "123",
        container: 'map',
        style: 'mapbox://styles/zzxzzxz/cllsxjwel004j01rf2un96dda',
        center: [-122.662323, 45.523751], // starting position
        zoom: 12
    });

    const bounds = [
        [-123.069003, 45.395273],
        [-122.303707, 45.612333]
    ];

    map.setMaxBounds(bounds);
}


function addAnchortoMap(waypoint) {
    map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: waypoint
                        }
                    }
                ]
            }
        },
        paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
        }
    });
}


function addAnchorsFromList(coordinate_list) {
    coordinate_list.forEach(coord => {
        addAnchortoMap(coord);
    });
}


function addRouteToMap(returned_route) {
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: returned_route
        }
    };

    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        });
    }
}




$(() => {
    initializeMap();
})