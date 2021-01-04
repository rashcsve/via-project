import geocoder
import requests

ZOMATO_API_KEY = "abc9df7f5ea8705f0248f9ee2712d14a"

HEADERS = {
    "Accept": "application/json",
    "user-key": ZOMATO_API_KEY,
}

g = geocoder.ip("me")
latlng = g.latlng
LAT = latlng[0]
LNG = latlng[-1]


def getNearestRestaurants():
    data = []
    offset = 0

    while offset < 200:
        params = (("lat", LAT), ("lon", LNG), ("start", offset))
        response = requests.get(
            "https://developers.zomato.com/api/v2.1/search",
            headers=HEADERS,
            params=params,
        )
        currentData = response.json()
        restaurants = currentData["restaurants"]
        for rest in restaurants:
            data.append(rest)
        offset += 20

    return data


def getDailyMenus(restaurants):
    data = []
    for rest in restaurants:
        result = getDailyMenu(rest)
        menu = result.json()
        currentRestaurant = dict(rest)
        if result.status_code == 200 and menu["daily_menus"]:
            currentRestaurant.update(menu)
            data.append(currentRestaurant)
    print(len(data))
    return data


def getDailyMenu(restaurant):
    id = restaurant["restaurant"]["id"]
    response = requests.get(
        "https://developers.zomato.com/api/v2.1/dailymenu",
        headers=HEADERS,
        params={"res_id": int(id)},
    )
    return response
