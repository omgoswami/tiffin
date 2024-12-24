from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config.from_object('config.Config')

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from server.routes.user_routes import user_bp
    from server.routes.buyer_routes import buyer_bp
    from server.routes.seller_routes import seller_bp
    from server.routes.order_routes import order_bp
    from server.routes.routes import main

    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(buyer_bp, url_prefix='/buyers')
    app.register_blueprint(seller_bp, url_prefix='/sellers')
    app.register_blueprint(order_bp, url_prefix='/orders')
    app.register_blueprint(main)

    return app