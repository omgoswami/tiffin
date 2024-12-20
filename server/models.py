from server import db


class CustomUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_buyer = db.Column(db.Boolean, default=False)
    is_seller = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"CustomUser {self.username}"

class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('custom_user.id'), nullable=False)

    # relationships 
    user = db.relationship('CustomUser', backref='buyer', lazy=True)
    orders = db.relationship('Order', back_populates='buyer', lazy=True)

class Seller(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('custom_user.id'), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    address = db.Column(db.Text, nullable=True)

    # relationships 
    user = db.relationship('CustomUser', backref='seller', lazy=True)
    items = db.relationship('Item', back_populates='seller', lazy=True)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    availability = db.Column(db.Boolean, default=False)

    # relationships
    seller = db.relationship('Seller', back_populates='items')

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('buyer.id'), nullable=False)
    # quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    # Relationships
    # item = db.relationship('Item', lazy=True)
    buyer = db.relationship('Buyer', back_populates='orders')
