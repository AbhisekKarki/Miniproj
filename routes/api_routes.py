from flask import Blueprint , request , jsonify , render_template
from models.users import add_user , get_user
from flask_jwt_extended import create_access_token , get_jwt_identity
api_routes = Blueprint("api_routes" , __name__)



@api_routes.route("/api/register" , methods = ["POST"])
def register():
    
    user = request.get_json()

    add_user(user["email"] , user["password"])

    return jsonify({"message" : "User Registered Successfully"}),200
@api_routes.route("/api/login" , methods = ["POST"])
def login():

    data = request.get_json()

    user = get_user(data["email"])

    if(user["password"] != data["password"]):
        return jsonify({"error" : "Invalid Credential"}) , 404
    
    token = create_access_token(identity=user["email"])

    return jsonify({"message" : "Logged in" , "token" : token}),200



    