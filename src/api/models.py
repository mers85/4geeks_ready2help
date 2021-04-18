from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.dialects.postgresql import ENUM as pgEnum
from enum import Enum, unique


@unique
class ProjectStatusEnum(Enum):
    published = 'published'
    draft = 'draft'


db = SQLAlchemy()

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
            "phone": self.phone
        }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name = name).first()
    
    @classmethod
    def create_person(cls, user, name, lastname, email, address, zipcode, phone):
        person = cls(user.id, name, lastname, email, address, zipcode, phone)

        user.roles.append(Role.find_by_name("supporter"))

        db.session.add(person)
        db.session.commit()

        return person


class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), unique=False, nullable=False)
    subtitle = db.Column(db.Text(), nullable=True)
    description = db.Column(db.Text(), nullable=True)
    money_needed = db.Column(db.Float(), nullable=True)
    people_needed = db.Column(db.Integer(), nullable=True)
    status = db.Column(pgEnum(ProjectStatusEnum), unique=False, nullable=False, default=ProjectStatusEnum.draft.value, server_default=ProjectStatusEnum.draft.value)
    
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    organization = db.relationship("Organization", back_populates="projects", uselist=False)


    def __repr__(self):
        return '<Project %r>' % self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "money_needed": self.money_needed,
            "people_needed": self.people_needed,
            "organization_id": self.organization_id,
            "status": self.status.value
        }

    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(title = title).first()

    @classmethod
    def get_all(cls):
        return cls.query.all()
        
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

        db.session.add(project)
        db.session.commit()

        return project

    
