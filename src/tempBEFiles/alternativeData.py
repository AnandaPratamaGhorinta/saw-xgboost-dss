from flask import Flask, request, jsonify
import sqlite3
from flask import Blueprint

app = Blueprint('alternativeData', __name__)


# Function to create the database
def create_table():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS alternative_kos
                 (id INTEGER PRIMARY KEY,
                 nama_kos TEXT,
                 harga TEXT,
                 panjang TEXT,
                 lebar TEXT,
                 kamar_mandi_dalam BOOLEAN,
                 air_panas BOOLEAN,
                 AC BOOLEAN,
                 kasur BOOLEAN,
                 meja BOOLEAN,
                 kursi BOOLEAN,
                 lemari BOOLEAN,
                 parkir_sepeda_motor BOOLEAN,
                 parkir_mobil BOOLEAN,
                 wifi BOOLEAN,
                 dapur_umum BOOLEAN,
                 laundry BOOLEAN,
                 kulkas BOOLEAN)''')
    conn.commit()
    conn.close()

# Create
@app.route('/kos', methods=['POST'])
def add_kos():
    data = request.json
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''INSERT INTO alternative_kos (nama_kos, harga, panjang, lebar, kamar_mandi_dalam, air_panas, AC, kasur, meja, kursi, lemari, parkir_sepeda_motor, parkir_mobil, wifi, dapur_umum, laundry, kulkas)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                 (data['nama_kos'], data['harga'], data['luas_kamar']['panjang'], data['luas_kamar']['lebar'],
                  data['fasilitas_kamar']['kamar_mandi_dalam'], data['fasilitas_kamar']['air_panas'],
                  data['fasilitas_kamar']['AC'], data['fasilitas_kamar']['kasur'], data['fasilitas_kamar']['meja'],
                  data['fasilitas_kamar']['kursi'], data['fasilitas_kamar']['lemari'], data['fasilitas_umum']['parkir_sepeda_motor'],
                  data['fasilitas_umum']['parkir_mobil'], data['fasilitas_umum']['wifi'], data['fasilitas_umum']['dapur_umum'],
                  data['fasilitas_umum']['laundry'], data['fasilitas_umum']['kulkas']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Kos added successfully'}), 201

# Read
@app.route('/kos/<int:id>', methods=['GET'])
def get_kos(id):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM kos WHERE id = ?''', (id,))
    kos = c.fetchone()
    conn.close()
    if kos:
        return jsonify({'kos': kos}), 200
    else:
        return jsonify({'message': 'Kos not found'}), 404

# Update
@app.route('/kos/<int:id>', methods=['PUT'])
def update_kos(id):
    data = request.json
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''UPDATE alternative_kos SET nama_kos = ?, harga = ?, panjang = ?, lebar = ?, kamar_mandi_dalam = ?, air_panas = ?, AC = ?, kasur = ?, meja = ?, kursi = ?, lemari = ?, parkir_sepeda_motor = ?, parkir_mobil = ?, wifi = ?, dapur_umum = ?, laundry = ?, kulkas = ? WHERE id = ?''',
              (data['nama_kos'], data['harga'], data['luas_kamar']['panjang'], data['luas_kamar']['lebar'],
               data['fasilitas_kamar']['kamar_mandi_dalam'], data['fasilitas_kamar']['air_panas'],
               data['fasilitas_kamar']['AC'], data['fasilitas_kamar']['kasur'], data['fasilitas_kamar']['meja'],
               data['fasilitas_kamar']['kursi'], data['fasilitas_kamar']['lemari'], data['fasilitas_umum']['parkir_sepeda_motor'],
               data['fasilitas_umum']['parkir_mobil'], data['fasilitas_umum']['wifi'], data['fasilitas_umum']['dapur_umum'],
               data['fasilitas_umum']['laundry'], data['fasilitas_umum']['kulkas'], id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Kos updated successfully'}), 200

# Delete
@app.route('/kos/<int:id>', methods=['DELETE'])
def delete_kos(id):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''DELETE FROM alternative_kos WHERE id = ?''', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Kos deleted successfully'}), 200

