from flask import Flask, request, jsonify
import sqlite3
from flask import Blueprint

app = Blueprint('criteria', __name__)


# Function to initialize the criteria table in the database
def init_criteria_db():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS criteria 
                (id INTEGER PRIMARY KEY, name TEXT, attribute TEXT, weight INTEGER)''')
    conn.commit()
    conn.close()

init_criteria_db()

# Function to execute database queries
def execute_query(query, values=()):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute(query, values)
    conn.commit()
    conn.close()

# Criteria API

# CREATE operation for criteria
@app.route('/api/criteria', methods=['POST'])
def create_criteria():
    data = request.json
    execute_query("INSERT INTO criteria (name, attribute, weight) VALUES (?, ?, ?)", 
                  (data['name'], data['attribute'], data['weight']))
    return jsonify({"message": "Criteria created successfully"})

# READ operation for criteria
@app.route('/api/criteria', methods=['GET'])
def get_all_criteria():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute("SELECT * FROM criteria")
    criteria = [{'id': row[0], 'name': row[1], 'attribute': row[2], 'weight': row[3]} for row in c.fetchall()]
    conn.close()
    return jsonify(criteria)

# UPDATE operation for criteria
@app.route('/api/criteria/<int:criteria_id>', methods=['PUT'])
def update_criteria(criteria_id):
    data = request.json
    execute_query("UPDATE criteria SET name=?, attribute=?, weight=? WHERE id=?", 
                  (data['name'], data['attribute'], data['weight'], criteria_id))
    return jsonify({"message": "Criteria updated successfully"})

# DELETE operation for criteria
@app.route('/api/criteria/<int:criteria_id>', methods=['DELETE'])
def delete_criteria(criteria_id):
    execute_query("DELETE FROM criteria WHERE id=?", (criteria_id,))
    return jsonify({"message": "Criteria deleted successfully"})
