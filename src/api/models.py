from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=True)
    organization = db.relationship("Organization", back_populates="users")


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
            "is_admin": self.is_admin
        }

    def update_user(self, organization=None, email=None, password=None):
        self.email = email if email is not None else self.email
        self.organization = organization if organization is not None else self.organization
        self.password = password if password is not None else self.password

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

        db.session.add(user)
        db.session.commit()

class Organization(db.Model):
    __tablename__ = "organizations"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=False, nullable=False)
    email = db.Column(db.String(256), unique=False, nullable=False)
    address = db.Column(db.String(256), unique=False, nullable=True)
    zipcode = db.Column(db.String(256), unique=False, nullable=True)
    phone = db.Column(db.String(256), unique=False, nullable=True)

    users = db.relationship("User", back_populates="organization")

    def __init__(self, name, email, address, zipcode, phone):
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
    def create_organization(cls, name, email, address, zipcode, phone):
        organization = cls(name, email, address, zipcode, phone)

        db.session.add(organization)
        db.session.commit()

        return organization

# class Person(db.Model):
#     __tablename__ = "persons"
#     id = db.Column(db.Integer, primary_key=True)
#     id_user = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(40), unique=False, nullable=False)
#     lastname = db.Column(db.String(40), unique=False, nullable=False)
#     email = db.Column(db.String(120), unique=False, nullable=False)
#     address = db.Column(db.String(120), unique=False, nullable=False)
#     zipcode = db.Column(db.String(8), unique=False, nullable=False)
#     phone = db.Column(db.String(15), unique=False, nullable=False)

#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     user = db.relationship("User", back_populates="person")

#     def __repr__(self):
#         return '<Person %r>' % self.id

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "lastname": self.lastname,
#             "email": self.email,
#             "address": self.address,
#             "zipcode": self.zipcode,
#             "phone": self.phone
#         }