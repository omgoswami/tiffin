from flask import Blueprint, request, session, jsonify
from server import db
from server.models import Order, order_items, Item
from server.serializers import OrderSchema

order_bp = Blueprint('order', __name__)
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)


@order_bp.route('/getall', methods=['GET'])
def get_orders():
    all_users = Order.query.all()
    result = orders_schema.dump(all_users)
    return orders_schema.jsonify(result)

@order_bp.route('/submit', methods=['POST'])
def submit():
    data = request.json
    buyer_id = session['buyer_id'] # seller id included in data
    item_quantities = data['items']

    total_price = 0
    items = []
    for item_data in item_quantities:
        print(item_data['itemId'])

    for item_data in item_quantities:
        item = Item.query.get(item_data['itemId'])
        # sanity check? 
        
        if item and item.seller_id == data['seller_id']:
            # total_price += item.price * item_data['quantity']
            total_price += item_data['price'] * item_data['quantity']
            items.append((item, item_data['quantity'], item_data['price']))
    
    order = Order(buyer_id=buyer_id, seller_id=data['seller_id'], total_price=total_price)
    db.session.add(order)
    db.session.flush() 

    for item, quantity, price in items:
        db.session.execute(
            order_items.insert().values(
                order_id=order.id,
                item_id=item.id,
                quantity=quantity,
                price=price
            )
        )
        item.quantity = item.quantity - quantity;

    db.session.commit()
    return order_schema.jsonify({"message": "Order submitted successfully", "order_id": order.id}), 201

@order_bp.route('/buyer', methods=['GET'])
def get_buyer_orders():
    try:
        buyer_id = session.get('buyer_id')
        if not buyer_id:
            return jsonify({"error": "Not logged in as a buyer"}), 401

        orders = Order.query.filter_by(buyer_id=buyer_id).all()
        if not orders:
            return jsonify({"message": "No orders available for this buyer"}), 200

        return orders_schema.jsonify(orders)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@order_bp.route('/seller', methods=['GET'])
def get_seller_orders():
    try:
        seller_id = session.get('seller_id')
        if not seller_id:
            return jsonify({"error": "Not logged in as a seller"}), 401

        orders = Order.query.filter_by(seller_id=seller_id).all()
        if not orders:
            return jsonify({"message": "No orders available for this seller"}), 200

        return orders_schema.jsonify(orders)
    except Exception as e:
        return jsonify({"error": str(e)}), 500