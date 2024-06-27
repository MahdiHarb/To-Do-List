from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/todo_db"
mongo = PyMongo(app)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = mongo.db.tasks.find()
    result = [{"id": str(task["_id"]), "task": task["task"]} for task in tasks]
    return jsonify(result), 200

@app.route('/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    task = mongo.db.tasks.find_one({"_id": ObjectId(task_id)})
    if task:
        return jsonify({"id": str(task["_id"]), "task": task["task"]}), 200
    else:
        return jsonify({"error": "Task not found"}), 404