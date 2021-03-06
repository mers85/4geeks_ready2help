from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ENUM as pgEnum
from enum import Enum, unique

import os
from aws import upload_file_to_s3

# Libreria para obtener la fecha de hoy
from datetime import datetime

@unique
class ProjectStatusEnum(Enum):
    published = 'published'
    draft = 'draft'


db = SQLAlchemy()


#USER & ROL
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    token = db.Column(db.String(256), unique=False, nullable=True)
    
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=True)
    organization = db.relationship("Organization", back_populates="users")

    person = db.relationship("Person", uselist=False, back_populates="user")

    roles = db.relationship('Role', secondary='user_roles',
                backref=db.backref('users', lazy='dynamic'))

    volunteering_projects = db.relationship("Project", secondary="project_volunteers", back_populates="volunteers" )
    

    # def __init__(self, email, password):
    #     if email == "" or password == "":
    #         raise Exception("Email and password required")

    #     self.email = email
    #     self.password = password


    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):

        return {
            "id": self.id,
            "email": self.email,
            "organization_id": self.organization_id,
            "roles": [role.name for role in self.roles],
            "details": self.person.serialize() if self.person is not None else None,
            "volunteering_projects": [volunteering_project.serialize_volunteer() for volunteering_project in self.volunteering_projects]
        }
        
    def serialize_user(self):
        return {
            "id": self.id,
            "email": self.email,
            "organization_id": self.organization_id,
            "roles": [role.name for role in self.roles]
        }

    def update_user(self, organization=None, email=None, password=None, token=None):
        self.email = email if email is not None else self.email
        if organization:
            self.organization = organization
            self.roles.append(Role.find_by_name("organization"))

        self.password = password if password is not None else self.password
        self.token = token if token is not None else self.token

        db.session.commit()
        return True

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email= email).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)


    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def create_user(cls, email, hashed_password):
        user = cls()
        user.email = email
        user.password = hashed_password

        user.roles.append(Role.find_by_name("member"))

        db.session.add(user)
        db.session.commit()
        return user


class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)

    def __init__(self, name, id=None):
        self.name = name

    def serialize(self):
        return {
            "name": self.name
        }

    def __repr__(self):
        return '<User %r>' % self.name

    @classmethod
    def create_role(cls, name):
        role = cls(name)

        db.session.add(role)
        db.session.commit()

        return role

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name= name).first()


class UserRoles(db.Model):
    __tablename__ = "user_roles"
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))


#ORGANIZACION
class Organization(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=False, nullable=False)
    email = db.Column(db.String(256), unique=False, nullable=False)
    address = db.Column(db.String(256), unique=False, nullable=True)
    zipcode = db.Column(db.String(256), unique=False, nullable=True)
    phone = db.Column(db.String(256), unique=False, nullable=True)

    users = db.relationship("User", back_populates="organization")
    projects = db.relationship("Project", back_populates="organization")

    def __init__(self, name, email, address, zipcode, phone, id=None):
        if name == "" or email == "" or address == "" or zipcode == "" or phone == "":
            raise Exception("Fields requiered !!", 401)

        self.name = name
        self.email = email
        self.address = address
        self.zipcode = zipcode
        self.phone = phone

    def __repr__(self):
        return '<Organization %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "zipcode": self.zipcode,
            "phone": self.phone
        }
        
    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name = name).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)
    
    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def create_organization(cls, name, email, address, zipcode, phone):
        organization = cls(name, email, address, zipcode, phone)

        db.session.add(organization)
        db.session.commit()

        return organization

    def update_organization(self, name=None, email=None, address=None, zipcode=None, phone=None):
        self.name = name if name is not None else self.name
        self.email = email if email is not None else self.email
        self.address = address if address is not None else self.address
        self.zipcode = zipcode if zipcode is not None else self.zipcode
        self.phone = phone if phone is not None else self.phone

        db.session.commit()
        return True

#PERSON PERFIL COMPLETO DEL USUARIO
class Person(db.Model):
    __tablename__ = "persons"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=False, nullable=False)
    lastname = db.Column(db.String(256), unique=False, nullable=False)
    email = db.Column(db.String(256), unique=False, nullable=False)
    address = db.Column(db.String(256), unique=False, nullable=False)
    zipcode = db.Column(db.String(256), unique=False, nullable=False)
    phone = db.Column(db.String(256), unique=False, nullable=False)

    id_user = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="person")

    donations = db.relationship("Donation", back_populates="person")

    def __init__(self, id_user, name, lastname, email, address, zipcode, phone):
        if name == "" or lastname == "" or email == "" or address == "" or zipcode == "" or phone == "":
            raise Exception("Fields requiered !!", 401)

        self.id_user = id_user
        self.name = name
        self.lastname = lastname
        self.email = email
        self.address = address
        self.zipcode = zipcode
        self.phone = phone

    def __repr__(self):
        return '<Person %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "address": self.address,
            "zipcode": self.zipcode,
            "phone": self.phone,
            "donations": [donation.serialize() for donation in self.donations]
        }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name = name).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)
    
    @classmethod
    def create_person(cls, user, name, lastname, email, address, zipcode, phone):
        person = cls(user.id, name, lastname, email, address, zipcode, phone)

        user.roles.append(Role.find_by_name("member"))

        db.session.add(person)
        db.session.commit()

        return person

    def update_user_details(self, name=None, lastname=None, email=None, address=None, zipcode=None, phone=None):
        self.name = name if name is not None else self.name
        self.lastname = lastname if lastname is not None else self.lastname
        self.email = email if email is not None else self.email
        self.address = address if address is not None else self.address
        self.zipcode = zipcode if zipcode is not None else self.zipcode
        self.phone = phone if phone is not None else self.phone

        db.session.commit()
        return True

#PROJECT
class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), unique=False, nullable=False)
    subtitle = db.Column(db.Text(), nullable=True)
    description = db.Column(db.Text(), nullable=True)
    money_needed = db.Column(db.Float(), nullable=True)
    people_needed = db.Column(db.Integer(), nullable=False, default="0", server_default="0")
    status = db.Column(pgEnum(ProjectStatusEnum), unique=False, nullable=False, default=ProjectStatusEnum.draft.value, server_default=ProjectStatusEnum.draft.value)
    total_donated = db.Column(db.Float(), nullable=False, default=0)

    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    organization = db.relationship("Organization", back_populates="projects", uselist=False)

    donations = db.relationship("Donation", back_populates="project")

    volunteers = db.relationship("User", secondary="project_volunteers", back_populates="volunteering_projects")
    featured_image_aws_url = db.Column(db.String(), unique=False, nullable=True)

    categories = db.relationship("Category", secondary="project_categories", back_populates="projects")

    

    def __repr__(self):
        return '<Project %r>' % self.title

    def serialize(self):
        if self.featured_image_aws_url:
            featured_image_url = self.featured_image_aws_url
        else:
            featured_image_url = "https://ready2help.s3.eu-west-3.amazonaws.com/default_ready2help.jpg"
        
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "money_needed": self.money_needed,
            "people_needed": self.people_needed,
            "organization_id": self.organization_id,
            "status": self.status.value,
            "total_donated": self.total_donated,
            "volunteers": [volunteer.serialize_user() for volunteer in self.volunteers],
            "volunteers_stats": self.serialize_stats_volunteers(),
            "categories": [category.serialize() for category in self.categories],
            "featured_image_url": featured_image_url
        }


    def serialize_volunteer(self):
        return {
            "id": self.id,
            "title": self.title,
        }

    def update_project(self, title=None, subtitle=None, money_needed=None, people_needed=None, status=None, organization_id=None, total_donated=None):
        self.title = title if title is not None else self.title
        self.subtitle = subtitle if subtitle is not None else self.subtitle
        self.money_needed = money_needed if money_needed is not None else self.money_needed
        self.people_needed = people_needed if people_needed is not None else self.people_needed
        self.status = status if status is not None else self.status
        self.organization_id = organization_id if organization_id is not None else self.organization_id
        self.total_donated = total_donated if total_donated is not None else self.total_donated

        db.session.commit()
        return True

    def update_project_volunteer(self, current_user):
        self.volunteers.append(current_user)
        db.session.commit()
        return self

    def serialize_stats_volunteers(self):
        total_volunteers_needed = self.people_needed
        total_project_volunteers = len(self.volunteers)
        project_volunteers_left = total_volunteers_needed - total_project_volunteers

        if total_volunteers_needed == 0:
            percentage = 0
        else:
            percentage = round(100 * float(total_project_volunteers)/float(total_volunteers_needed))

        if project_volunteers_left == 0:
            completed = True
        else:
            completed = False
       
        return {
            "total_volunteers_needed": total_volunteers_needed,
            "total_project_volunteers": total_project_volunteers,
            "project_volunteers_left": project_volunteers_left,
            "project_volunteers_percent": percentage,
            "completed": completed
        }
            

    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(title = title).first()
    
    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_all(cls):
        return cls.query.order_by(cls.id).all()
    
    @classmethod
    def get_by_categorie(cls, categorie_param):
        projects = cls.get_all()
        
        projects_searched = []
        for project in projects:
            for project_category in project.categories:
                if project_category == categorie_param:
                    projects_searched.append(project)

        return projects_searched
        
    @classmethod
    def create(cls, title, subtitle, description, money_needed, people_needed, status, organization_id):
        project = cls()
        
        project.title = title 
        project.subtitle = subtitle
        project.description = description
        project.money_needed = money_needed
        project.people_needed = people_needed
        project.status = status
        project.organization_id = organization_id
        project.total_donated = 0

        db.session.add(project)
        db.session.commit()

        return project


    def add_categories(self, category_ids):
        for category_id in category_ids:
            category = Category.find_by_id(category_id)
            if category:
                self.categories.append(category)

        db.session.commit()


    def attach_featured_image_url(self, files):
        for key in files:
            file = files[key]

            try:
                url_image = upload_file_to_s3(file, os.environ.get('S3_BUCKET_NAME'))
                self.featured_image_aws_url = url_image
            except Exception as e:
                return e

        db.session.commit()
        return self

    # def featured_image_url(self):
    #     if self.featured_image_aws_url:
    #         return self.featured_image_aws_url
    #     else:
    #         return "https://ready2help.s3.eu-west-3.amazonaws.com/default_ready2help.jpg"


#DONACIONES
class Donation(db.Model):
    __tablename__ = "donations"
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    payment_type = db.Column(db.String, nullable=False)
    stripe_payment_id = db.Column(db.String, nullable=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    project = db.relationship("Project", uselist=False, back_populates="donations")
    person_id = db.Column(db.Integer, db.ForeignKey('persons.id'), nullable=False)
    person = db.relationship("Person", uselist=False, back_populates="donations")

    def __repr__(self):
        return '<Donation %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "project_id": self.project_id,
            "project_title": self.project.title,
            "person_id": self.person_id,
            "amount": self.amount,
            "payment_type": self.payment_type,
            "date": self.date
        }
    
    @classmethod
    def create(cls, project_donate, person_donate, amount, payment_type, stripe_payment_id):
        donation = cls()

        donation.project = project_donate
        donation.person = person_donate
        donation.amount = amount
        donation.payment_type = payment_type
        donation.stripe_payment_id = stripe_payment_id
        
        db.session.add(donation)
        db.session.commit()

        return donation

#ASOCIACIONES 
project_volunteers = db.Table('project_volunteers', db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'))
)

#CATEGORIA
class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100), unique=True)

    projects = db.relationship("Project", secondary="project_categories", back_populates="categories" )

    def __init__(self, name, id=None):
        self.name = name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __repr__(self):
        return '<Category %r>' % self.name

    @classmethod
    def create_category(cls, name):
        category = cls(name)

        db.session.add(category)
        db.session.commit()

        return category

    @classmethod
    def find_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name= name).first()

#ASOCIACIONES 
project_categories = db.Table('project_categories', db.Model.metadata,
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id')),
    db.Column('project_id', db.Integer, db.ForeignKey('projects.id'))
)