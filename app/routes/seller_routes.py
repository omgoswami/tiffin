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
        user_id=data['user_id'],
        bio=data.get('bio'),
        address=data.get('address'),
    )
    db.session.add(new_seller)
    db.session.commit()
    return seller_schema.jsonify(new_seller), 201