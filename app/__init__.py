from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from app.routes.user_routes import user_bp
    from app.routes.buyer_routes import buyer_bp
    from app.routes.seller_routes import seller_bp

    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(buyer_bp, url_prefix='/api/buyer-profiles')
    app.register_blueprint(seller_bp, url_prefix='/api/seller-profiles')

    return app