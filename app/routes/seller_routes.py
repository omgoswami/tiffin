from flask import Blueprint, request
from app import db
from app.models import Seller
from app.serializers import SellerSchema

seller_bp = Blueprint('seller', __name__)
seller_schema = SellerSchema()
sellers_schema = SellerSchema(many=True)

@seller_bp.route('/create', methods=['POST'])
def create_seller_profile():
    data = request.json
    new_seller = Seller(
        bio=data.get('bio'),
        address=data.get('address'),
    )
    # TODO: probably update here instead of add with separate screen for sellers
    db.session.add(new_seller)
    db.session.commit()
    return seller_schema.jsonify(new_seller), 201

@seller_bp.route('/getall', methods=['GET'])
def get_users():
    all_users = Seller.query.all()
    result = sellers_schema.dump(all_users)
    return sellers_schema.jsonify(result)