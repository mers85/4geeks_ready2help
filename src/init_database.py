import os

import click
import flask_migrate
from flask import Flask
from flask.cli import with_appcontext
from sqlalchemy import create_engine, Table
from sqlalchemy.exc import IntegrityError
from data_inicial import data

# from api.models import db, User, Organization, Person, Project, Role
import api.models
models = api.models

@click.command()
@with_appcontext
def init_db():
    load_seed_data(data)

def load_seed_data(data):
    for table, rows in data.items():
        ModelClass = getattr(models, table)

        for row in rows:
            if isinstance(ModelClass, Table):
                insert = ModelClass.insert().values(**row)
                try:
                    models.db.session.execute(insert)
                    models.db.session.commit()
                except IntegrityError as e:
                    print(f'ERROR: inserting row {row} in "{table}". IGNORING')
                    print(e)

            else:
                print(row)
                new_row = ModelClass(**row)
                models.db.session.merge(new_row)
                models.db.session.commit()