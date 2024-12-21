from flask import Blueprint, request, jsonify, session
from server import db
from server.models import CustomUser, Buyer, Seller
from server.serializers import CustomUserSchema

user_bp = Blueprint('user', __name__)
user_schema = CustomUserSchema()
users_schema = CustomUserSchema(many=True)

@user_bp.route('/login', methods=['GET','POST'])
def login():
    email = request.form.get('email');
    password = request.form.get('password');
    user = CustomUser.query.filter_by(email=email).first()

    # TODO: implement hashing
    if user and user.password == password:
        print("this is the user id: ", user.id)
        session['user_id'] = user.id
        seller = Seller.query.filter_by(user_id=user.id).first()
        if seller:
            print("seller id: ", seller.id)
            session['seller_id'] = seller.id
        else:
            print("seller is none")
        buyer = Buyer.query.filter_by(user_id=user.id).first()
        if buyer:
            print("buyer id: ", buyer.id)
            session['buyer_id'] = buyer.id
        return jsonify({"message": "Login successful", "username": user.username}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401

@user_bp.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')
    if user_id:
        return jsonify({'loggedIn': True})
    return jsonify({'loggedIn': False})

@user_bp.route('/create', methods=['POST'])
def create_user():
    data = request.get_json()  

    required_fields = ['username', 'email', 'password', 'is_buyer', 'is_seller']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    username = data['username']
    email = data['email']
    pwd = data['password']  # TODO: Hash the password
    is_buyer = data['is_buyer']
    is_seller = data['is_seller']
    new_user = CustomUser(
        username=username,
        email=email,
        password=pwd,
        is_buyer=is_buyer,
        is_seller=is_seller
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        db.session.flush()

        if is_buyer:
            new_buyer = Buyer(user_id=new_user.id)
            db.session.add(new_buyer)

        if is_seller:
            new_seller = Seller(user_id=new_user.id)
            db.session.add(new_seller)
        
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    user = CustomUser.query.filter_by(username=username).first()
    session['user_id'] = user.id
    seller = Seller.query.filter_by(user_id=user.id).first()
    if seller:
        print("seller id: ", seller.id)
        session['seller_id'] = seller.id
    else:
        print("seller is none")
    buyer = Buyer.query.filter_by(user_id=user.id).first()
    if buyer:
        print("buyer id: ", buyer.id)
        session['buyer_id'] = buyer.id

    return user_schema.jsonify(new_user), 201

@user_bp.route('/getall', methods=['GET'])
def get_users():
    all_users = CustomUser.query.all()
    result = users_schema.dump(all_users)
    return users_schema.jsonify(result)
