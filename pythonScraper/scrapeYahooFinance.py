from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import json
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Allows requests from any origin


def scrape_yahoo_finance():
    url = "https://finance.yahoo.com/news"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch Yahoo Finance news"}

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("li", class_="stream-item story-item yf-1usaaz9")  # Find news articles

    news_list = []
    for article in articles[:30]:  # Limit to 10 articles
        title_tag = article.find("h3")
        link_tag = article.find("a", class_="subtle-link")
        ticker_tag = article.find("a", {"data-testid": "ticker-container"})  # Find stock ticker (if available)

        if title_tag and link_tag:
            title = title_tag.text.strip()
            link = "https://finance.yahoo.com" + link_tag["href"] if link_tag["href"].startswith("/") else link_tag["href"]
            company = ticker_tag.text.strip() if ticker_tag else "General Market"

            news_list.append({"title": title, "company": company, "url": link})

    return json.dumps(news_list, indent=2)

@app.route("/api/news", methods=["GET"])
def get_news():
    return jsonify(scrape_yahoo_finance())

if __name__ == "__main__":
    app.run(debug=True, port = 3001)