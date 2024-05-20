from flask import Flask, request, jsonify

app = Flask(__name__)

def saw(data):
    # Extract criteria and weights
    criteria = set()
    weights = {}
    alternatives = []

    for kos in data:
        kos_data = {
            'nama_kos': kos['nama_kos'],
            'kriteria': {}
        }
        for item in kos['data_kriteria']:
            criteria.add(item['nama_kriteria'])
            weights[item['nama_kriteria']] = item['bobot']
            kos_data['kriteria'][item['nama_kriteria']] = item['isi_kriteria']
        alternatives.append(kos_data)

    # Normalization step
    max_values = {k: float('-inf') for k in criteria}
    for alt in alternatives:
        for crit, value in alt['kriteria'].items():
            if isinstance(value, (int, float)):
                if value > max_values[crit]:
                    max_values[crit] = value

    normalized_data = []
    for alt in alternatives:
        norm_alt = {
            'nama_kos': alt['nama_kos'],
            'kriteria': {},
            'total_score': 0
        }
        for crit, value in alt['kriteria'].items():
            if isinstance(value, (int, float)):
                norm_value = value / max_values[crit]
            else:
                norm_value = 1 if value else 0
            norm_weighted_value = norm_value * (weights[crit] / 100)
            norm_alt['kriteria'][crit] = norm_weighted_value
            norm_alt['total_score'] += norm_weighted_value
        normalized_data.append(norm_alt)

    # Rank alternatives
    normalized_data.sort(key=lambda x: x['total_score'], reverse=True)
    
    return normalized_data

@app.route('/saw', methods=['POST'])
def calculate_saw():
    try:
        data = request.get_json()
        if not data or 'data' not in data:
            return jsonify({"error": "Invalid input"}), 400

        results = saw(data['data'])
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
