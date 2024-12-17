from flask import Blueprint, request
from app import db
from app.models import CustomUser
from app.serializers import CustomUserSchema

user_bp = Blueprint('user', __name__)
user_schema = CustomUserSchema()
users_schema = CustomUserSchema(many=True)

@user_bp.route('/create', methods=['POST'])
def create_user():
    # TODO: add in is_buyer and is_seller
    user = request.form.get('username')
    email = request.form.get('email')
    pwd = request.form.get('password')
    new_user = CustomUser(
        username=user,
        email=email,
        password=pwd
    )
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user), 201

@user_bp.route('/getall', methods=['GET'])
def get_users():
    all_users = CustomUser.query.all()
    result = users_schema.dump(all_users)
    return users_schema.jsonify(result)
