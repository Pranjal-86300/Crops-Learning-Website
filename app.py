from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

file = open('crops.json', 'r')

# Load the JSON data
data = json.load(file)
crops_data=data["crops"]
@app.route('/')
def index():
    crop_names = [crop["Crop Name"] for crop in crops_data]
    return render_template('index.html', crops=crop_names)

@app.route('/crop/<crop_name>')
def get_crop_details(crop_name):
    for crop in crops_data:
        if crop['Crop Name'].lower() == crop_name.lower():
            return jsonify(crop)
    return jsonify({'error': 'Crop not found'}), 404

file.close()
if __name__ == '__main__':
    app.run(debug=True)

