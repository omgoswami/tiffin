from flask import Blueprint, request
from server import db
from server.models import Buyer
from server.serializers import BuyerSchema

buyer_bp = Blueprint('buyer', __name__)
buyer_schema = BuyerSchema()
buyers_schema = BuyerSchema(many=True)

@buyer_bp.route('/create', methods=['POST'])
def create_buyer():
    data = request.json
    new_buyer = Buyer(
        user_id=data['user_id'],
    )
    db.session.add(new_buyer)
    db.session.commit()
    return buyer_schema.jsonify(new_buyer), 201

@buyer_bp.route('/getall', methods=['GET'])
def get_buyers():
    all_users = Buyer.query.all()
    result = buyers_schema.dump(all_users)
    return buyers_schema.jsonify(result)