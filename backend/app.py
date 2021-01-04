import os
import json
from flask import Flask, redirect, url_for, request, render_template, jsonify
from pymongo import MongoClient
from bson import ObjectId, json_util
from flask_cors import CORS
from restaurants import getNearestRestaurants, getDailyMenus

flask = Flask(__name__)
CORS(flask, resources={r"/*": {"origins": "http://localhost:3000"}})

# To change accordingly
# print(os.environ)
# client = MongoClient("db", 27017)
# db = client.appdb
client = MongoClient(
    "mongodb+srv://user:useruser@via.eforv.mongodb.net/via?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
)
db = client.menus


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@flask.route("/api/restaurants", methods=["GET"])
def restaurants():
    restaurants = getNearestRestaurants()
    data = getDailyMenus(restaurants)

    dbItems = db.restaurants.find()
    dbRestaurants = [items for items in dbItems]
    data.insert(0, JSONEncoder().encode(dbRestaurants))
    return json.dumps(data)


@flask.route("/api/new", methods=["POST"])
def new():
    result = db.restaurants.insert_one(request.json["restaurant"])
    return str(result.inserted_id)


@flask.route("/api/id/<_id>", methods=["GET"])
def getId(_id):
    restaurant = db.restaurants.find_one({"_id": ObjectId(_id)})
    return json.dumps(restaurant, default=json_util.default)


if __name__ == "__main__":
    flask.run(host="0.0.0.0", debug=True)
