from flask import Flask, render_template, request, jsonify
from models import get_all_tasks, add_task, update_task, delete_task, init_db
import os

app = Flask(__name__)

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def tasks():
    tasks = get_all_tasks()
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add():
    data = request.json
    task_text = data.get('task', '').strip()
    if task_text:
        new_task = add_task(task_text)
        return jsonify(new_task), 201
    return jsonify({'error': 'Empty task'}), 400

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update(task_id):
    data = request.json
    task_text = data.get('task')
    completed = data.get('completed')
    if task_text is None and completed is None:
        return jsonify({'error': 'No valid data provided'}), 400
    update_task(task_id, task_text, completed)
    return jsonify({'success': True})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete(task_id):
    delete_task(task_id)
    return jsonify({'success': True})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
