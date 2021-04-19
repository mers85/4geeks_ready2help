"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, make_response, url_for, Blueprint
from api.models import db, User, Organization, Person, Project, Role
from api.utils import generate_sitemap, APIException
from api.forms import ProjectForm

#Para imprimir errores
import sys

# library for Simple Mail Transfer Protocol# library for Simple Mail Transfer Protocol
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import email.message

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

###################################################################################
# End-Point para listar datos de tabla User (OJO: No tienen autorizacion)         #
###################################################################################
@api.route('/users', methods =['GET'])
def get_all_users():
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

    return jsonify({'users': all_users}), 200

###################################################################################
# End-Point para listar datos de tabla Organization (OJO: No tienen autorizacion) #
###################################################################################
@api.route('/organizations', methods =['GET'])
def get_all_organizations():
    # querying the database
    # for all the entries in it
    organizations = Organization.get_all()
    # converting the query objects
    # to list of jsons
    all_organizations = []
    for organization in organizations:
        # appending the user data json
        # to the response list
        all_organizations.append(organization.serialize())

    return jsonify({'organizations': all_organizations}), 200

###################################################################################
# End-Point para listar datos de tabla Role (OJO: No tienen autorizacion)         #
###################################################################################
@api.route('/roles', methods =['GET'])
def get_all_roles():
    # querying the database
    # for all the entries in it
    roles = Role.get_all()
    # converting the query objects
    # to list of jsons
    all_roles = []
    for role in roles:
        # appending the user data json
        # to the response list
        all_roles.append(role.serialize())

    return jsonify({'roles': all_roles}), 200

###################################################################################
# End-Point para listar datos de tabla Project (OJO: No tienen autorizacion)      #
###################################################################################
@api.route('/projects', methods =['GET'])
def get_all_projects():
    projects = Project.get_all()

    list_projects = []
    for project in projects:
        list_projects.append(project.serialize())

    return jsonify(list_projects), 200

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
            print("Unexpected error:", sys.exc_info())
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
           user = User.create_user(email, hashed_password)
        except:
            print("Unexpected error:", sys.exc_info())
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
            'exp' : datetime.utcnow() + timedelta(minutes = 90)
        }, app.config['SECRET_KEY'])

        #roles = [role.name for role in user.roles]


        return jsonify({'token' : token.decode('UTF-8'), "user": user.serialize() }), 201
    # returns 403 if password is wrong
    raise APIException("Wrong Password !!", 403)

@api.route('/profile', methods =['GET'])
@authentication_required
def profile(current_user):
    user = current_user
    dict_user = user.serialize()

    if user.organization:
        organization = user.organization.serialize()
        dict_user['organization'] = organization

    if user.person:
        person = user.person.serialize()
        dict_user['person'] = person

    return jsonify({'user': dict_user}), 200

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
            print("Unexpected error:", sys.exc_info())
            raise APIException("Something went wrong during organization registration", 401)

        user = User.find_by_id(id_user)

        if not user.update_user(organization):
            raise APIException("Something went wrong during user update-organization", 401)

        return jsonify({"message" : "Successfully registered.", "organization" : organization.serialize()}), 201
    else:
        # returns 202 if user already exists
        return jsonify({"message" :"Organization already exists. Please Log in."}), 202

@api.route('/register_pers', methods =['POST'])
@authentication_required
def register_pers(current_user):
    pers = request.get_json()
    user = current_user
    name = pers["name"]
    lastname = pers["lastname"]
    email = pers["email"]
    address = pers["address"]
    zipcode = pers["zipcode"]
    phone = pers["phone"]

    person = Person.find_by_name(name)
    if not person:
        try:
            person = Person.create_person(user, name, lastname, email, address, zipcode, phone)

        except:
            print("Unexpected error:", sys.exc_info())
            raise APIException("Something went wrong during person registration", 401)

        return jsonify({"message" :" Successfully registered."}), 201
    else:
        # returns 202 if user already exists
        return jsonify({"message" :"Person already exists. Please Log in."}), 202


@api.route('/request_reset_pass', methods =['POST'])
def request_reset_pass():
    body = request.get_json()
    user_email = body["email"]
    frontend_URL = os.environ.get('FRONTEND_URL')

    user = User.find_by_email(user_email)

    if user:
        try:
            token = jwt.encode({
            'id': user.id,
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
            }, app.config['SECRET_KEY'])

            short_token = token.decode("utf-8").split(".")[0]

            result_upadte = user.update_user(token=short_token)

            url_reset_email = frontend_URL + "/reset_pass?token=" + short_token

            url_reset_app = "/reset_pass?token=" + short_token

        except:
            print("Unexpected error:", sys.exc_info())
            raise APIException("Something went wrong. Your password could not be changed.", 401)

        message_email=f"Hi {user.email}! As requested, here is your link to reset your password: {url_reset_email}"
        email = send_email(receiver=user.email, message=message_email)

        return jsonify({'token' : user.token, 'url_reset':url_reset_app}), 201

    else:
        raise APIException("This user does not exist", 401)


@api.route('/reset_pass', methods =['POST'])
def reset_pass():
    body = request.get_json()
    user_email = body["email"]
    user_passw = body["password"]
    user_token = body["token"]

    user = User.find_by_email(user_email)

    if user:
        if user.token != user_token:
            raise APIException("The token of request is not correct.", 401)
        try:
            hashed_password = generate_password_hash(user_passw, "sha256")

            result_upadte = user.update_user(password=hashed_password, token="")
        except:
            print("Unexpected error:", sys.exc_info())
            raise APIException("Something went wrong. Your password could not be changed.", 401)

        return jsonify({"message" :"Password successfully changed."}), 201
    else:
        raise APIException("This user does not exist", 401)


def send_email(receiver=None, message=""):
    if receiver is not None:
        try:
            msg = MIMEMultipart()
            password = os.environ.get('PASS_EMAIL')
            msg['From'] = "ready2helpemail@gmail.com"
            msg['To'] = receiver
            msg['Subject'] = "Ready2Help - Reset Password"
            # add in the message body
            msg.attach(MIMEText(message, 'plain'))
            #create server
            server = smtplib.SMTP('smtp.gmail.com: 587')
            server.starttls()
            # Login Credentials for sending the mail
            server.login(msg['From'], password)
            # send the message via the server.
            server.sendmail(msg['From'], msg['To'], msg.as_string())
            server.quit()
            print("successfully sent email to: %s" % (msg['To']))
        except:
            print("Unexpected error:", sys.exc_info())
            raise APIException("Something went wrong. The email was not sending.", 401)
    else:
        raise APIException("Something went wrong. The receiver is empty.", 401)


@api.route('/organizations/<int:organization_id>/projects', methods =['POST'])
@authentication_required
def create_project(current_user, organization_id):
    organization = Organization.find_by_id(organization_id)
    organization_user_ids = [user.id for user in organization.users]

    if current_user.id not in organization_user_ids:
        raise APIException("User not allowed to administrate this organization", 401)

    form = ProjectForm.from_json(request.get_json())
    if not form.validate():
        return jsonify(errors=form.errors), 400


    try:
        project = Project.create(
            form.title.data,
            form.subtitle.data,
            form.description.data,
            form.money_needed.data,
            form.people_needed.data,
            form.status.data,
            organization_id
        )
    except:
        print("Unexpected error:", sys.exc_info())
        raise APIException("Something went wrong during project creation", 401)

    return jsonify({"message" : "Project created", "project" : project.serialize()}), 201

@api.route('/projects/<int:id>', methods =['GET'])
def create_project():
    s