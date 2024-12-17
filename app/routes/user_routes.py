from flask import Blueprint, request, jsonify
from app import db
from app.models import CustomUser, Buyer, Seller
from app.serializers import CustomUserSchema

user_bp = Blueprint('user', __name__)
user_schema = CustomUserSchema()
users_schema = CustomUserSchema(many=True)

@user_bp.route('/create', methods=['POST'])
def create_user():
    user = request.form.get('username')
    email = request.form.get('email')
    pwd = request.form.get('password')
    is_buyer = True if 'True' in request.form.get('is_buyer') else False
    is_seller = True if 'True' in request.form.get('is_seller') else False
    new_user = CustomUser(
        username=user,
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

    return user_schema.jsonify(new_user), 201

@user_bp.route('/getall', methods=['GET'])
def get_users():
    all_users = CustomUser.query.all()
    result = users_schema.dump(all_users)
    return users_schema.jsonify(result)
