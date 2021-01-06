import os, json, requests, urllib.parse
from glob import glob
from flask import Flask, redirect, url_for, request, render_template, jsonify
from pymongo import MongoClient
from bson import ObjectId, json_util
from flask_cors import CORS
from datetime import datetime
from flask_restplus import Api, Resource, fields
from restaurants import getRestaurants

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
"""Database"""
client = MongoClient(
    "mongodb+srv://user:useruser@via.eforv.mongodb.net/via?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
)
db = client.restaurants
restaurants = db.zomato

DATE_FORMAT = '%Y-%m-%d'
CURRENT_DATE = datetime.now().date().strftime(DATE_FORMAT)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


"""Swagger"""
flask_app = Api(
    app=app,
    version="1.0",
    title="Daily Menu VIA App",
    description=
    "A simple SPA application for showing lunch menus of selected restaurants built on REST API."
)
"""Define namespace"""
restaurants_name_space = flask_app.namespace(
    "restaurant", description='Get or add info about restaurants')
geolocation_name_space = flask_app.namespace("geolocation",
                                             description='Get the geolocation')


@restaurants_name_space.route("/all")  # Define the route
class RestaurantsList(Resource):
    @flask_app.doc(responses={
        200: 'OK',
        400: 'Bad Request'
    },
                   description="Get list of all restaurants"
                   )  # Documentation of route
    def get(self):  # GET method of REST
        try:
            data = []
            if (restaurants.count() == 0):
                data = getRestaurants(restaurants)
            else:
                data = [items for items in restaurants.find()]
                firstObjDate = data[0]['date']
                if (firstObjDate != CURRENT_DATE):
                    restaurants.drop()
                    data = getRestaurants(restaurants)

            dbItems = db.custom.find()
            dbRestaurants = [items for items in dbItems]
            for rest in dbRestaurants:
                restDate = rest['date']
                restDateConverted = datetime.strptime(restDate, DATE_FORMAT)
                if (restDate == CURRENT_DATE):
                    data.insert(0, rest)
            return JSONEncoder().encode(data)
        except:
            return "Bad Request", 400


rest = flask_app.model(
    'restaurant', {
        'date':
        fields.Date(description='Date', required=True),
        'name':
        fields.String(description='Name', required=True),
        'cuisines':
        fields.String(description='Cuisine'),
        'price_range':
        fields.Integer(
            description='Price Range', required=True, enum=[1, 2, 3, 4, 5]),
        'location':
        fields.String(description='Location', required=True),
        'highlights':
        fields.List(fields.String, description="Highlights", as_list=True),
        'dishes':
        fields.List(
            fields.String, description="Dishes", as_list=True, required=True)
    })

# rest = flask_app.model(
#     'Restaurant', {"rest": fields.Nested(rest_change_fields, required=True)})


@restaurants_name_space.route("/new")  # Define the route
class AddNew(Resource):
    @flask_app.doc(responses={
        200: 'OK',
        400: 'Bad Request'
    },
                   description="Create new restaurant",
                   body=rest)
    def post(self, *args):
        try:
            result = db.custom.insert_one(request.json["restaurant"])
            return str(result.inserted_id)
        except:
            return "Bad Request", 400


@restaurants_name_space.route("/id/<_id>")  # Define the route
class Restaurant(Resource):
    @flask_app.doc(responses={
        200: 'OK',
        400: 'Bad Request'
    },
                   description="Get the restaurant by id"
                   )  # Documentation of route
    def get(self, _id):  # GET method of REST
        try:
            restaurant = db.custom.find_one({"_id": ObjectId(_id)})
            if not restaurant:
                restaurant = restaurants.find_one({"_id": ObjectId(_id)})
            return json.dumps(restaurant, default=json_util.default)
        except:
            return "Bad Request", 400


@geolocation_name_space.route("/<_address>")  # Define the route
class Geolocation(Resource):
    @flask_app.doc(responses={
        200: 'OK',
        400: 'Bad Request'
    },
                   description="Get the geolocation coordinates"
                   )  # Documentation of route
    def get(self, _address):  # GET method of REST
        try:
            url = 'https://nominatim.openstreetmap.org/search/' + urllib.parse.quote(
                _address) + '?format=json'
            response = requests.get(url).json()
            latlng = [response[0]["lat"], response[0]["lon"]]
            return json.dumps(latlng)
        except:
            return "Bad Request", 400
