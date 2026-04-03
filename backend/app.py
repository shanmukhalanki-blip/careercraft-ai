from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend to connect

@app.route("/")
def home():
    return "CareerCraft AI Backend Running 🚀"

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        file = request.files.get("resume")

        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        # Dummy analysis (for now)
        return jsonify({
            "score": 75,
            "missing_keywords": ["Python", "SQL"],
            "suggestions": [
                "Add measurable achievements",
                "Improve summary section",
                "Include more relevant skills"
            ]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)