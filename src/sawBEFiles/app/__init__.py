from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    # Import the blueprints from your modules
    from .xgSAW import xg_saw_bp
    from .SAW import saw_bp
    from .kriteria import kriteria_bp
    from .kosXG import kos_bp

    # Register the blueprints with the Flask app
    app.register_blueprint(xg_saw_bp)
    app.register_blueprint(saw_bp)
    app.register_blueprint(kriteria_bp)
    app.register_blueprint(kos_bp)

    return app
