from flask import Flask
from flask import request
from flask_cors import CORS
from random import randint
import json

flask = Flask(__name__)  # create flask 
cors = CORS(flask)

from pymongo import MongoClient
client = MongoClient("mongodb+srv://user:useruser@via.eforv.mongodb.net/via?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE")
db=client.business

@flask.route("/", methods=['GET'])  # define route
def example():
  #Step 2: Create sample data
  names = ['Kitchen','Animal','State', 'Tastey', 'Big','City','Fish', 'Pizza','Goat', 'Salty','Sandwich','Lazy', 'Fun']
  company_type = ['LLC','Inc','Company','Corporation']
  company_cuisine = ['Pizza', 'Bar Food', 'Fast Food', 'Italian', 'Mexican', 'American', 'Sushi Bar', 'Vegetarian']
  for x in range(1, 3):
      business = {
          'name' : names[randint(0, (len(names)-1))] + ' ' + names[randint(0, (len(names)-1))]  + ' ' + company_type[randint(0, (len(company_type)-1))],
          'rating' : randint(1, 5),
          'cuisine' : company_cuisine[randint(0, (len(company_cuisine)-1))] 
      }
      #Step 3: Insert business object directly into MongoDB via isnert_one
      result=db.reviews.insert_one(business)
      #Step 4: Print to the console the ObjectID of the new document
      print('Created {0} of 2 as {1}'.format(x,result.inserted_id))
  #Step 5: Tell us that you are done
  print('finished creating 500 business reviews')

@flask.route("/reviews", methods=["GET"])
def getAllReviews():
  print(db.reviews.find_one({'rating': 5}));
  return json.dumps(db.reviews.find_one({'rating': 5}), default=str);
  # return "Sveta"

if __name__ == '__main__':  # Main method
  flask.run(port=8088, debug=False, threaded=True, host="127.0.0.1")  # Starts server
