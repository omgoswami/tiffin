from flask import Blueprint, request
from server import db
from server.models import Seller, Item
from server.serializers import SellerSchema

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
def get_sellers():
    all_users = Seller.query.all()
    result = sellers_schema.dump(all_users)
    return sellers_schema.jsonify(result)

@seller_bp.route('/<seller_id>/additem', methods=['POST'])
def add_item(seller_id):
    # TODO: set up frontend code to accept Item data
    # this method will just add to Item table 
    pass

@seller_bp.route('/<seller_id>/items', methods=['GET'])
def get_items(seller_id):
    try:
        seller = Seller.query.get(seller_id)
        if not seller:
            return seller_schema.jsonify({"error": "Seller with this id not found"}), 404

        items = Item.query.filter_by(seller_id=seller_id).all()
        return seller_schema.dump(items)
    
    except Exception as e:
        return seller_schema.jsonify({"error": str(e)}), 500