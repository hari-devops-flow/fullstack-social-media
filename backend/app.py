from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from db_setup import init_db, db
from models import User, Post
import os

app = Flask(__name__)

# Configurations
app.config['SECRET_KEY'] = 'super-secret-key'  # Change to a secure key in production
app.config['UPLOAD_FOLDER'] = './uploads'
init_db(app)

# JWT Setup
jwt = JWTManager(app)

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        token = create_access_token(identity=user.username)
        return jsonify({"access_token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/api/posts', methods=['GET', 'POST'])
@jwt_required()
def posts():
    if request.method == 'GET':
        posts = Post.query.all()
        return jsonify([{"id": p.id, "title": p.title, "content": p.content, "user": p.user.username} for p in posts])
    elif request.method == 'POST':
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return jsonify({"message": "User not found"}), 404
        new_post = Post(title=data['title'], content=data['content'], user_id=user.id)
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message": "Post created successfully"}), 201

@app.route('/api/upload', methods=['POST'])
@jwt_required()
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file provided"}), 400
    file = request.files['file']
    user = User.query.filter_by(username=request.form['username']).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    user_folder = os.path.join(app.config['UPLOAD_FOLDER'], str(user.id))
    os.makedirs(user_folder, exist_ok=True)
    file_path = os.path.join(user_folder, file.filename)
    file.save(file_path)
    return jsonify({"message": "File uploaded successfully", "path": file_path}), 200

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
