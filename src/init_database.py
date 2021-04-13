import os

import click
import flask_migrate
from flask import Flask
from flask.cli import with_appcontext
from sqlalchemy import create_engine, Table
from sqlalchemy.exc import IntegrityError

from api.models import db, User, Organization, Person, Project, Role


@click.command()
@with_appcontext
def init_db():
    role_admin = Role.create_role("admin")
    role_basic = Role.create_role("basic")
    role_organization = Role.create_role("organization")
    role_supporter = Role.create_role("supporter")


