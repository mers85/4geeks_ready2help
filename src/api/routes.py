"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, make_response, url_for, Blueprint
from api.models import db, User, Organization
from api.utils import generate_sitemap, APIException

#import for authentication
from  werkzeug.security import generate_password_hash, check_password_hash

# imports for PyJWT authentication
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import current_app as app


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

#User

# decorator for verifying the JWT
def authentication_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # jwt is passed in the request header
        auth_header = request.headers.get("Authorization", None)

        if not auth_header:
            raise APIException("Missing Authorization Header", 401)
        #check if header contains type and token
        parts = auth_header.split()
        if len(parts) != 2:
            raise APIException("Bad Authorization Header. Expected value 'Bearer <Token>' ", 401)
        token = parts[1]
   
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.find_by_id(data["id"])
        except:
            raise APIException("Token is invalid !!", 401)
        # returns the current logged in users contex to the routes
        return  f(current_user, *args, **kwargs)
   
    return decorated

# signup route
@api.route('/signup', methods =['POST'])
def signup():
     # creates data
    body = request.get_json()

    if not body or not body["email"] or not body["password"]:
        # returns 401 if any email or / and password is missing
        raise APIException("Bad request missing required params", 400)
   
    # gets email and password
    email = body["email"]
    hashed_password = generate_password_hash(body["password"], "sha256")


     # checking for existing user
    user = User.find_by_email(email)
    if not user:
        try:
            User.create_user(email, hashed_password)
        except:
            raise APIException("Something went wrong during user registration", 401)
   
        return jsonify({"message" :" Successfully registered."}), 201
    else:
        # returns 202 if user already exists
        return jsonify({"message" :"User already exists. Please Log in."}), 202

# route for loging user in
@api.route('/login', methods =['POST'])
def login():
    # creates data
    auth = request.get_json()
   
    if not auth or not auth["email"] or not auth["password"]:
        # returns 401 if any email or / and password is missing
        raise APIException("Login required !!", 401)
   
    user = User.find_by_email(auth["email"])
    if not user:
        # returns 401 if user does not exist
         raise APIException("User does not exist !!", 401)
   
    if check_password_hash(user.password, auth["password"]):
        # generates the JWT Token
        token = jwt.encode({
            'id': user.id,
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'])
   
        return jsonify({'token' : token.decode('UTF-8')}), 201
    # returns 403 if password is wrong
    raise APIException("Wrong Password !!", 403)

@api.route('/users', methods =['GET'])
@authentication_required
def get_all_users(current_user):
    # querying the database
    # for all the entries in it
    users = User.get_all()
    # converting the query objects
    # to list of jsons
    all_users = []
    for user in users:
        # appending the user data json 
        # to the response list
        all_users.append(user.serialize())
   
    return jsonify({'users': all_users})

@api.route('/profile', methods =['GET'])
@authentication_required
def profile(current_user):
    return jsonify({'user': current_user.serialize()})


@api.route('/register_org', methods =['POST'])
@authentication_required
def register_org(current_user):
    org = request.get_json()
    id_user = current_user.id
    name = org["name"] 
    email = org["email"] 
    address = org["address"] 
    zipcode = org["zipcode"] 
    phone = org["phone"]

    organization = Organization.find_by_name(name)
    if not organization:
        try:
            organization = Organization.create_organization(name, email, address, zipcode, phone)

        except:
            raise APIException("Something went wrong during organization registration", 401)

        user = User.find_by_id(id_user)
        
        if not user.update_user(organization):
            raise APIException("Something went wrong during user update-organization", 401)
        
        return jsonify({"message" :" Successfully registered."}), 201
    else:
        # returns 202 if user already exists
        return jsonify({"message" :"Organization already exists. Please Log in."}), 202

    

