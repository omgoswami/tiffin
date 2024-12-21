from flask import Blueprint, request, session, jsonify
from server import db
from server.models import Seller, Item
from server.serializers import SellerSchema, ItemSchema
from datetime import datetime


seller_bp = Blueprint('seller', __name__)
seller_schema = SellerSchema()
sellers_schema = SellerSchema(many=True)
item_schema = ItemSchema()

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

@seller_bp.route('/additem', methods=['POST'])
def add_item():
    # get seller ID from user ID
    seller_id = session['seller_id']
    if not seller_id:
        return jsonify({"error": "User is not registered as a seller."}), 403

    # get info from post listing form
    # data = request.get_json()
    name = request.form.get('dishName')
    description = request.form.get('description')
    price = request.form.get('price')
    startTime = request.form.get('startTime')
    endTime = request.form.get('endTime')

    start_timestamp = datetime.strptime(startTime, "%H:%M")
    start_timestamp = start_timestamp.replace(year=datetime.now().year,
                                              month=datetime.now().month,
                                              day=datetime.now().day)
    
    end_timestamp = datetime.strptime(endTime, "%H:%M")
    end_timestamp = end_timestamp.replace(year=datetime.now().year,
                                          month=datetime.now().month,
                                          day=datetime.now().day)


    new_item = Item(
        seller_id=seller_id,
        name=name,
        description=description,
        price=price,
        startTime=start_timestamp,
        endTime=end_timestamp
    )

    # add to items table
    db.session.add(new_item)
    db.session.commit()
    return item_schema.jsonify(new_item), 201
    

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