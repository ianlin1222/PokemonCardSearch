from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/pokemon-card/<name>', methods=['GET'])
def get_pokemon_card(name):
    url = f"https://api.pokemontcg.io/v2/cards?q=name:{name}"
    headers = {"X-Api-Key": "acf4c879-28de-40f3-8397-736e88590a9b"}  # Replace with your actual API key
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Card not found"}), response.status_code

if __name__ == "__main__":
    app.run(debug=True)
