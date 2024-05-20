from flask import Flask, request, jsonify
import sqlite3
from flask import Blueprint

app = Blueprint('kos', __name__)

# Function to initialize the kos table in the database
def init_kos_db():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS kos 
                (id INTEGER PRIMARY KEY, name TEXT, address TEXT, price INTEGER,
                room_facilities TEXT, public_facilities TEXT, parking_facilities TEXT,
                bathroom_facilities TEXT, room_size INTEGER)''')
    conn.commit()
    conn.close()

init_kos_db()

# Function to execute database queries
def execute_query(query, values=()):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute(query, values)
    conn.commit()
    conn.close()

# Kos API

# CREATE operation for kos
@app.route('/api/kos', methods=['POST'])
def create_kos():
    data = request.json
    execute_query("INSERT INTO kos (name, address, price, room_facilities, public_facilities, parking_facilities, bathroom_facilities, room_size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                  (data['name'], data['address'], data['price'], data['room_facilities'], data['public_facilities'], data['parking_facilities'], data['bathroom_facilities'], data['room_size']))
    return jsonify({"message": "Kos created successfully"})

# READ operation for kos
@app.route('/api/kos', methods=['GET'])
def get_all_kos():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute("SELECT * FROM kos")
    kos = [{'id': row[0], 'name': row[1], 'address': row[2], 'price': row[3],
            'room_facilities': row[4], 'public_facilities': row[5], 'parking_facilities': row[6],
            'bathroom_facilities': row[7], 'room_size': row[8]} for row in c.fetchall()]
    conn.close()
    return jsonify(kos)

# UPDATE operation for kos
@app.route('/api/kos/<int:kos_id>', methods=['PUT'])
def update_kos(kos_id):
    data = request.json
    execute_query("UPDATE kos SET name=?, address=?, price=?, room_facilities=?, public_facilities=?, parking_facilities=?, bathroom_facilities=?, room_size=? WHERE id=?", 
                  (data['name'], data['address'], data['price'], data['room_facilities'], data['public_facilities'], data['parking_facilities'], data['bathroom_facilities'], data['room_size'], kos_id))
    return jsonify({"message": "Kos updated successfully"})

# DELETE operation for kos
@app.route('/api/kos/<int:kos_id>', methods=['DELETE'])
def delete_kos(kos_id):
    execute_query("DELETE FROM kos WHERE id=?", (kos_id,))
    return jsonify({"message": "Kos deleted successfully"})
