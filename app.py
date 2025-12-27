from flask import Flask
from routes.api_routes import api_routes
from flask_jwt_extended import JWTManager

app = Flask(__name__ , static_folder= "frontend" , static_url_path="")
app.config["JWT_SECRET_KEY"] = "Super_secret-key"
jwt = JWTManager(app)

app.register_blueprint(api_routes)

@app.route("/")
def home():
    return app.send_static_file("login.html")

@app.route("/register")
def register():
    return app.send_static_file("register.html")

if __name__ == "__main__":
    app.run(debug= True)