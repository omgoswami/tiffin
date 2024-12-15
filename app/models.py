from app import db


class CustomUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_buyer = db.Column(db.Boolean, default=False)
    is_seller = db.Column(db.Boolean, default=False)

class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('custom_user.id'), nullable=False)

class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('custom_user.id'), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    address = db.Column(db.Text, nullable=True)