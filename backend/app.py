from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import os

app = Flask(__name__)
CORS(app)

# Mock database (in a real scenario, this would be a database or vector store)
CANCER_QA = [
    {"question": "What is cancer?", "answer": "Cancer is a group of diseases involving abnormal cell growth."},
    {"question": "Is cancer contagious?", "answer": "No, cancer is not contagious."}
]

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    query = data.get('query', '').lower().strip()
    
    if not query:
        return jsonify({"error": "No query provided"}), 400

    # 1. Simple search simulation
    match = next((item for item in CANCER_QA if query in item['question'].lower()), None)
    
    if match:
        return jsonify({"text": match['answer'], "isFallback": False})

    # 2. AI Fallback Simulation
    fallbacks = [
        "Based on medical literature, this query requires specialized clinical context. Please consult your oncologist.",
        "Our primary database doesn't have a direct match. The AI suggests consulting a professional for diagnostic imaging.",
        "The AI Group engine indicates research in this area is evolving. We recommend seeking a second opinion.",
        "I couldn't find a direct answer. Please specify the type of cancer for a more accurate response."
    ]
    return jsonify({"text": random.choice(fallbacks), "isFallback": True})

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)