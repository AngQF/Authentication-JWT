"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup_user():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    if body_email and body_password:
        user_created = User(email = body_email, password = body_password)
        db.session.add(user_created)
        db.session.commit()
        return jsonify({"msg": "created properly", "User": user_created.serialize()}), 200    
    else: return jsonify({"msg": "Error, please check email or password"}), 400   



@api.route('/login', methods=['POST'])
def login_user():
    body_email = request.json.get("email")
    body_password = request.json.get("password") 
    if body_email and body_password:
        user = User.query.filter_by(email = body_email).filter_by(password = body_password).first()
    #----------------------------OTRA FORMA DE ESCRIBIR LA LINEA DE ARRIBA---------------------------# 
        # user = User.query.filter(User.email == body_email, User.password == body_password).first()
    #------------------------------------------------------------------------------------------------#    
        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify({"logged":True, "token": access_token}), 200
        else: return jsonify({"logged":False, "msg": "Access denied"}), 400

    else: return jsonify({"msg": "Error, please check email or password"}), 400    



@api.route('/private', methods=['GET'])
@jwt_required()
def private_page(): 
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"msg": "Thanks for join us!"}), 200
    else:
        return jsonify({"msg": "No authorized"})    