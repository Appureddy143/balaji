from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return {"message": "AI Service Running"}

if __name__ == "__main__":
import os

if __name__ == "__main__":
    port = int(os.environ.get("AI_PORT", 5001))
    app.run(host="0.0.0.0", port=port)
