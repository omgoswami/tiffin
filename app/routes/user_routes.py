from flask import Blueprint, request
from app import db
from app.models import CustomUser
from app.serializers import CustomUserSchema

user_bp = Blueprint('user', __name__)
user_schema = CustomUserSchema()
users_schema = CustomUserSchema(many=True)

@user_bp.route('/create', methods=['POST'])
def create_user():
    '''data = request.json
    new_user = CustomUser(
        username=data['username'],
        email=data['email'],
        password=data['password'],  # Use hashed password in production
        is_buyer=data.get('is_buyer', False),
        is_seller=data.get('is_seller', False)
    )'''
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
    users = db.session.query(CustomUser)
    ret = []
    for user in users:
        user_obj = CustomUser(username=user.username,
                              email=user.email,
                              password=user.password,
                              is_buyer=False,
                              is_seller=False)
        ret.append(user_obj)
    return users_schema.dump(ret)