from server import db

# association table for Orders and Items
# each row represents an Item that was part of an Order -- an Order can be 
# retrieved by getting all Items in order_items with the same order_id
order_items = db.Table(
    'order_items',
    db.Column('order_id', db.ForeignKey('order.id'), primary_key=True),
    db.Column('item_id', db.ForeignKey('item.id'), primary_key=True),
    db.Column('quantity', db.Integer, nullable=False, default=1),
    db.Column('price', db.Float, nullable=False)
)

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
    orders = db.relationship('Order', back_populates='seller', lazy=True)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    availability = db.Column(db.Boolean, default=True)
    quantity = db.Column(db.Integer, default=0)
    
    # TODO: include dates as well as times
    startTime = db.Column(db.DateTime(timezone=True), default=db.func.now())
    endTime = db.Column(db.DateTime(timezone=True))

    # relationships
    seller = db.relationship('Seller', back_populates='items')
    orders = db.relationship('Order', secondary=order_items, back_populates='items')

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('buyer.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)
    # quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    # Relationships
    # item = db.relationship('Item', lazy=True)
    buyer = db.relationship('Buyer', back_populates='orders')
    seller = db.relationship('Seller', back_populates='orders')
    items = db.relationship('Item', secondary=order_items, back_populates='orders')
