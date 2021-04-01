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
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
   
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.find_by_id(data["id"])
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(current_user, *args, **kwargs)
   
    return decorated

# signup route
@api.route('/signup', methods =['POST'])
def signup():
     # creates data
    body = request.get_json()
   
    # gets email and password
    email = body["email"]
    hashed_password = generate_password_hash(body["password"], "sha256")

     # checking for existing user
    user = User.find_by_email(email)
    if not user:
        # database ORM object
        user = User(
            email = email,
            password = hashed_password
        )
        # insert user
        db.session.add(user)
        db.session.commit()
   
        return make_response('Successfully registered.', 201)
    else:
        # returns 202 if user already exists
        return make_response('User already exists. Please Log in.', 202)

# route for loging user in
@api.route('/login', methods =['POST'])
def login():
    # creates data
    auth = request.get_json()
   
    if not auth or not auth["email"] or not auth["password"]:
        # returns 401 if any email or / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
        )
   
    user = User.find_by_email(auth["email"])
   
    if not user:
        # returns 401 if user does not exist
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
        )
   
    if check_password_hash(user.password, auth["password"]):
        # generates the JWT Token
        token = jwt.encode({
            'id': user.id,
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'])
   
        return make_response(jsonify({'token' : token.decode('UTF-8')}), 201)
    # returns 403 if password is wrong
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
    )

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