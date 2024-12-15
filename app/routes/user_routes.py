from flask import Blueprint, request
from app import db
from app.models import CustomUser
from app.serializers import CustomUserSchema

user_bp = Blueprint('user', __name__)
user_schema = CustomUserSchema()
users_schema = CustomUserSchema(many=True)

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.json
    new_user = CustomUser(
        username=data['username'],
        email=data['email'],
        password=data['password'],  # Use hashed password in production
        is_buyer=data.get('is_buyer', False),
        is_seller=data.get('is_seller', False)
    )
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user), 201