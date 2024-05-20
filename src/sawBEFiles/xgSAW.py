from flask import Flask, request, jsonify
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

app = Flask(__name__)

# Load the training data from CSV
data_path = "data_training.csv"  # Update this with the path to your CSV file
data = pd.read_csv(data_path)

# Drop non-numeric columns if they exist
columns_to_drop = ["nama_kos", "alamat"]
data.drop(columns=[col for col in columns_to_drop if col in data.columns], inplace=True)

# Split the data into features (X) and target (y)
X = data.drop(columns=["harga"])  # Adjust column name as per your dataset
y = data["harga"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the XGBoost model
params = {
    'objective': 'reg:squarederror',
    'n_estimators': 100,  # Adjust parameters as needed
    'max_depth': 3,
    'learning_rate': 0.1,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'gamma': 0,
    'random_state': 42
}

model = xgb.XGBRegressor(**params)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)

# Define the endpoint for price prediction
@app.route('/predict', methods=['POST'])
def predict_price():
    try:
        # Receive request data in JSON format
        request_data = request.json
        
        # Convert request data to DataFrame
        df = pd.DataFrame(request_data)
        
        # Drop non-numeric columns if they exist
        df.drop(columns=[col for col in columns_to_drop if col in df.columns], inplace=True)
        
        # Perform prediction with the trained model
        predicted_prices = model.predict(df)
        
        # Return predicted prices in JSON format
        return jsonify({'predicted_price': predicted_prices.tolist()})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
