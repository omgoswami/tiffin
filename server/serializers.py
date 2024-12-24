from server import ma
from server.models import CustomUser, Buyer, Seller, Item, Order
from marshmallow import fields

class CustomUserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CustomUser
        include_fk = True
        load_instance = True

class BuyerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Buyer
        include_fk = True
        load_instance = True

class SellerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Seller
        include_fk = True
        load_instance = True
    #id = ma.auto_field()
    #user_id = ma.auto_field()
    username = fields.String(attribute="user.username")

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        include_fk = True
        load_instance = True

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        include_fk = True
        load_instance = True