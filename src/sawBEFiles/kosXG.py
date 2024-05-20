from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = 'kos.db'

def create_table():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS kos_xg (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama_kos TEXT NOT NULL,
            harga INTEGER NOT NULL,
            alamat TEXT NOT NULL,
            luas_kamar_panjang REAL NOT NULL,
            luas_kamar_lebar REAL NOT NULL,
            kamar_mandi_dalam BOOLEAN NOT NULL,
            air_panas BOOLEAN NOT NULL,
            AC BOOLEAN NOT NULL,
            kasur BOOLEAN NOT NULL,
            meja BOOLEAN NOT NULL,
            kursi BOOLEAN NOT NULL,
            lemari BOOLEAN NOT NULL,
            parkir_sepeda_motor BOOLEAN NOT NULL,
            parkir_mobil BOOLEAN NOT NULL,
            wifi BOOLEAN NOT NULL,
            dapur_umum BOOLEAN NOT NULL,
            laundry BOOLEAN NOT NULL,
            kulkas BOOLEAN NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_table()

@app.route('/kos', methods=['POST'])
def create_kos():
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO kos_xg (
            nama_kos, harga, alamat, luas_kamar_panjang, luas_kamar_lebar,
            kamar_mandi_dalam, air_panas, AC, kasur, meja, kursi, lemari,
            parkir_sepeda_motor, parkir_mobil, wifi, dapur_umum, laundry, kulkas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['nama_kos'], data['harga'], data['alamat'], data['luas_kamar_panjang'], data['luas_kamar_lebar'],
        data['kamar_mandi_dalam'], data['air_panas'], data['AC'], data['kasur'], data['meja'], data['kursi'],
        data['lemari'], data['parkir_sepeda_motor'], data['parkir_mobil'], data['wifi'], data['dapur_umum'],
        data['laundry'], data['kulkas']
    ))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Kos created successfully'}), 201

@app.route('/kos', methods=['GET'])
def get_all_kos():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM kos_xg')
    kos_list = cursor.fetchall()
    conn.close()

    output = []
    for kos in kos_list:
        kos_data = {
            'id': kos[0],
            'nama_kos': kos[1],
            'harga': kos[2],
            'alamat': kos[3],
            'luas_kamar_panjang': kos[4],
            'luas_kamar_lebar': kos[5],
            'kamar_mandi_dalam': kos[6],
            'air_panas': kos[7],
            'AC': kos[8],
            'kasur': kos[9],
            'meja': kos[10],
            'kursi': kos[11],
            'lemari': kos[12],
            'parkir_sepeda_motor': kos[13],
            'parkir_mobil': kos[14],
            'wifi': kos[15],
            'dapur_umum': kos[16],
            'laundry': kos[17],
            'kulkas': kos[18]
        }
        output.append(kos_data)
    return jsonify(output), 200

@app.route('/kos/<id>', methods=['GET'])
def get_kos(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM kos_xg WHERE id=?', (id,))
    kos = cursor.fetchone()
    conn.close()
    
    if kos is None:
        return jsonify({'message': 'Kos not found'}), 404

    kos_data = {
        'id': kos[0],
        'nama_kos': kos[1],
        'harga': kos[2],
        'alamat': kos[3],
        'luas_kamar_panjang': kos[4],
        'luas_kamar_lebar': kos[5],
        'kamar_mandi_dalam': kos[6],
        'air_panas': kos[7],
        'AC': kos[8],
        'kasur': kos[9],
        'meja': kos[10],
        'kursi': kos[11],
        'lemari': kos[12],
        'parkir_sepeda_motor': kos[13],
        'parkir_mobil': kos[14],
        'wifi': kos[15],
        'dapur_umum': kos[16],
        'laundry': kos[17],
        'kulkas': kos[18]
    }
    return jsonify(kos_data), 200

@app.route('/kos/<id>', methods=['PUT'])
def update_kos(id):
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE kos_xg SET
            nama_kos=?, harga=?, alamat=?, luas_kamar_panjang=?, luas_kamar_lebar=?,
            kamar_mandi_dalam=?, air_panas=?, AC=?, kasur=?, meja=?, kursi=?, lemari=?,
            parkir_sepeda_motor=?, parkir_mobil=?, wifi=?, dapur_umum=?, laundry=?, kulkas=?
        WHERE id=?
    ''', (
        data['nama_kos'], data['harga'], data['alamat'], data['luas_kamar_panjang'], data['luas_kamar_lebar'],
        data['kamar_mandi_dalam'], data['air_panas'], data['AC'], data['kasur'], data['meja'], data['kursi'],
        data['lemari'], data['parkir_sepeda_motor'], data['parkir_mobil'], data['wifi'], data['dapur_umum'],
        data['laundry'], data['kulkas'], id
    ))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Kos updated successfully'}), 200

@app.route('/kos/<id>', methods=['DELETE'])
def delete_kos(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM kos_xg WHERE id=?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Kos deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
