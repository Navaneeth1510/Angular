from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    app.logger.info(f"Received data: {data}")
    user_input = data.get("seed", "")
    n_chars = data.get("n_chars", 1000)
    if user_input:
        try:
            response = generate_response(user_input, n_chars)
            return jsonify({"generated_text": response})
        except Exception as e:
            app.logger.error(f"Error in generating response: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No input text provided"}), 400

def generate_response(user_input, n_chars):
    api_url = "https://69b1-209-249-224-250.ngrok-free.app/chat"
    payload = {
        "user_input": user_input  # Correct the key to "user_input"
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(api_url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json().get("response", "")  # Correct the key to "response"
    else:
        response.raise_for_status()

if __name__ == "__main__":
    app.run(port=8000, debug=True)
