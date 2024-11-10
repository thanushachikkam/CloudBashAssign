from flask import Flask, request, jsonify
from collections import Counter
import requests
from bs4 import BeautifulSoup
import re

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    url = data.get("url")
    
    # Fetch content from URL
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 400

    # Parse and clean content
    soup = BeautifulSoup(response.text, "html.parser")
    text = soup.get_text().lower()
    words = re.findall(r'\b\w+\b', text)
    
    # Calculate frequency of each word
    word_counts = Counter(words)
    top_words = word_counts.most_common(10)  # Get top 10 words

    # Prepare response data
    result = [{"word": word, "frequency": freq} for word, freq in top_words]
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
