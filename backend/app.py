import os
import json
from flask import Flask, redirect, url_for, request, render_template, jsonify
from pymongo import MongoClient
from bson import ObjectId, json_util
from flask_cors import CORS
from datetime import datetime
from restaurants import getRestaurants

flask = Flask(__name__)
CORS(flask, resources={r"/*": {"origins": "http://localhost:3000"}})

# To change accordingly
# print(os.environ)
# client = MongoClient("db", 27017)
# db = client.appdb
client = MongoClient(
    "mongodb+srv://user:useruser@via.eforv.mongodb.net/via?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
)
mongoRestaurants = client.restaurants
restaurantsCollection = mongoRestaurants.data
db = client.menus

DATE_FORMAT = '%Y-%m-%d'
CURRENT_DATE = datetime.now().date().strftime(DATE_FORMAT)


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@flask.route("/api/restaurants", methods=["GET"])
def restaurants():
    if (restaurantsCollection.count() == 0):
        data = getRestaurants(restaurantsCollection)
    else:
        data = [items for items in restaurantsCollection.find()]
        firstObjDate = data[0]['date']
        if (firstObjDate != CURRENT_DATE):
            restaurantsCollection.drop()
            data = getRestaurants(restaurantsCollection)

    dbItems = db.restaurants.find()
    dbRestaurants = [items for items in dbItems]
    for rest in dbRestaurants:
        restDate = rest['date']
        restDateConverted = datetime.strptime(restDate, DATE_FORMAT)
        if (restDate == CURRENT_DATE):
            data.insert(0, rest)
    return JSONEncoder().encode(data)


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
