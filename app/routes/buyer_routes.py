from flask import Blueprint, request
from app import db
from app.models import Buyer
from app.serializers import BuyerSchema

buyer_bp = Blueprint('buyer', __name__)
buyer_schema = BuyerSchema()
buyers_schema = BuyerSchema(many=True)

@buyer_bp.route('/', methods=['POST'])
def create_buyer():
    data = request.json
    new_buyer = Buyer(
        user_id=data['user_id'],
    )
    db.session.add(new_buyer)
    db.session.commit()
    return buyer_schema.jsonify(new_buyer), 201