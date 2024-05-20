from flask import Flask
from criteria import app as criteria_app
from kos import app as kos_app
from alternativeData import app as alternative_kos_app
app = Flask(__name__)

# Register blueprints
app.register_blueprint(criteria_app)
app.register_blueprint(kos_app)
app.register_blueprint(alternative_kos_app)

if __name__ == '__main__':
    app.run(debug=True)
