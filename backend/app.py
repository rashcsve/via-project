import os, json
from glob import glob
from flask import Flask, redirect, url_for, request, render_template, jsonify
from pymongo import MongoClient
from bson import ObjectId, json_util
from flask_cors import CORS
from datetime import datetime
from flask_swagger_ui import get_swaggerui_blueprint
from flask_restplus import Api, Resource
from restaurants import getRestaurants

flask = Flask(__name__)
app = Api(
    app=flask,
    version="1.0",
    title="Daily Menu VIA App",
    description=
    "A simple SPA application for showing lunch menus of selected restaurants built on REST API."
)
CORS(flask, resources={r"/*": {"origins": "http://localhost:3000"}})

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


"""Define namespace"""
restaurants_name_space = app.namespace(
    "api", description='Get info about restaurants')


@restaurants_name_space.route("/restaurants")  # Define the route
class RestaurantsList(Resource):
    @app.doc(responses={200: 'OK'}, description="Get list of all restaurants"
             )  # Documentation of route
    def get(self):  # GET method of REST
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
            print(rest['name'])
            restDate = rest['date']
            restDateConverted = datetime.strptime(restDate, DATE_FORMAT)
            print(restDate)
            if (restDate == CURRENT_DATE):
                data.insert(0, rest)
        return JSONEncoder().encode(data)


@restaurants_name_space.route("/new")  # Define the route
class AddNew(Resource):
    @app.doc(responses={
        200: 'OK',
        400: 'Invalid Argument'
    },
             description="Create new restaurant")
    def post(self):
        result = db.restaurants.insert_one(request.json["restaurant"])
        return str(result.inserted_id)


@restaurants_name_space.route("/id/<_id>")  # Define the route
class Restaurant(Resource):
    @app.doc(responses={200: 'OK'},
             description="Get the restaurant")  # Documentation of route
    def get(self, _id):  # GET method of REST
        restaurant = db.restaurants.find_one({"_id": ObjectId(_id)})
        if not restaurant:
            restaurant = restaurantsCollection.find_one({"_id": ObjectId(_id)})
        return json.dumps(restaurant, default=json_util.default)


if __name__ == "__main__":
    flask.run(host="0.0.0.0", debug=True)
