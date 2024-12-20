from server import ma
from server.models import CustomUser, Buyer, Seller

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
