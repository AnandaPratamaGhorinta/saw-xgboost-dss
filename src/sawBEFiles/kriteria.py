from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)
DATABASE = 'kriteria_kos.db'

# Fungsi untuk membuat koneksi ke database
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Inisialisasi database dan tabel
def init_db():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS kriteria_kos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kode TEXT NOT NULL,
                nama TEXT NOT NULL,
                bobot REAL NOT NULL,
                tipe TEXT NOT NULL
            )
        ''')
        conn.commit()

# Endpoint untuk membuat kriteria baru
@app.route('/kriteria', methods=['POST'])
def add_kriteria():
    data = request.get_json()
    kode = data['kode']
    nama = data['nama']
    bobot = data['bobot']
    tipe = data['tipe']
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('INSERT INTO kriteria_kos (kode, nama, bobot, tipe) VALUES (?, ?, ?, ?)',
                       (kode, nama, bobot, tipe))
        conn.commit()
    return jsonify({'message': 'Kriteria created successfully!'}), 201

# Endpoint untuk mendapatkan semua kriteria
@app.route('/kriteria', methods=['GET'])
def get_kriteria():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM kriteria_kos')
        kriteria = cursor.fetchall()
        return jsonify([dict(row) for row in kriteria]), 200

# Endpoint untuk mendapatkan kriteria berdasarkan ID
@app.route('/kriteria/<int:id>', methods=['GET'])
def get_kriteria_by_id(id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM kriteria_kos WHERE id = ?', (id,))
        kriteria = cursor.fetchone()
        if kriteria is None:
            return jsonify({'message': 'Kriteria not found'}), 404
        return jsonify(dict(kriteria)), 200

# Endpoint untuk memperbarui kriteria
@app.route('/kriteria/<int:id>', methods=['PUT'])
def update_kriteria(id):
    data = request.get_json()
    kode = data['kode']
    nama = data['nama']
    bobot = data['bobot']
    tipe = data['tipe']
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE kriteria_kos SET kode = ?, nama = ?, bobot = ?, tipe = ? WHERE id = ?
        ''', (kode, nama, bobot, tipe, id))
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({'message': 'Kriteria not found'}), 404
    return jsonify({'message': 'Kriteria updated successfully!'}), 200

# Endpoint untuk menghapus kriteria
@app.route('/kriteria/<int:id>', methods=['DELETE'])
def delete_kriteria(id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM kriteria_kos WHERE id = ?', (id,))
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({'message': 'Kriteria not found'}), 404
    return jsonify({'message': 'Kriteria deleted successfully!'}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
