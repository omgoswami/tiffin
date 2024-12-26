from flask import Blueprint, request, jsonify, session
from server import db
from server.models import CustomUser, Buyer, Seller
from server.serializers import CustomUserSchema
import boto3
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

user_bp = Blueprint('user', __name__)
user_schema = CustomUserSchema()
users_schema = CustomUserSchema(many=True)


s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_DEFAULT_REGION')
)

@user_bp.route('/login', methods=['GET','POST'])
def login():
    email = request.form.get('email');
    password = request.form.get('password');
    user = CustomUser.query.filter_by(email=email).first()

    # TODO: implement hashing
    if user and user.password == password:
        print("this is the user id: ", user.id)
        session['user_id'] = user.id
        session['username'] = user.username
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

@user_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully", "redirect": "/"})

@user_bp.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')
    if user_id:
        return jsonify({
            'loggedIn': True,
            'username': session.get('username')
            })
    return jsonify({'loggedIn': False, 'username': None})

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
    session['username'] = user.username
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

@user_bp.route('/upload-profile-image', methods=['POST'])
def upload_profile_image():
    if 'user_id' not in session:
        return jsonify({"error": "User is not logged in."}), 403

    file = request.files.get('profileImage')
    if not file:
        return jsonify({"error": "No file uploaded."}), 400

    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"{uuid.uuid4().hex}{file_extension}"
    print(file_name)
    print("I am here")
    print(os.getenv('S3_BUCKET_NAME'))
    print(file.content_type)
    try:
        s3.upload_fileobj(
            file,
            os.getenv('S3_BUCKET_NAME'),
            file_name,
            ExtraArgs={'ContentType': file.content_type}
        )

        '''s3.upload_file(
            file_name,
            os.getenv('S3_BUCKET_NAME')
        )'''
        

        file_url = f"https://{os.getenv('S3_BUCKET_NAME')}.s3.{os.getenv('AWS_DEFAULT_REGION')}.amazonaws.com/{file_name}"
        print(file_url)
        user = CustomUser.query.get(session['user_id'])
        if not user:
            return jsonify({"error": "User not found."}), 404

        user.profile_image_url = file_url
        db.session.commit()

        return jsonify({"success": True, "newImageUrl": file_url}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@user_bp.route('/get-user-profile', methods=['GET'])
def get_user_profile():
    user_id = session.get('user_id')
    try:
        user = CustomUser.query.get(user_id)
        if not user:
            return user_schema.jsonify({"error": "User with this id not found"}), 404
        return user_schema.dump(user)
    except Exception as e:
        return user_schema.jsonify({"error": str(e)}), 500