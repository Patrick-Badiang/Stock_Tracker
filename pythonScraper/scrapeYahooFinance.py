from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import json
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Allows requests from any origin


def scrape_yahoo_finance():
    url = "https://finance.yahoo.com/topic/stock-market-news/"
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
        description_tag = article.find("p")
        link_tag = article.find("a", class_="subtle-link")
        ticker_tag = article.find("a", {"data-testid": "ticker-container"})  # Find stock ticker (if available)
        img_tag = article.find("img", class_="C(black) Fz(16px) Fw(600) Fz(14px)--mobile Fw(400)--mobile")  # Find image (if available)

        if title_tag and link_tag:
            title = title_tag.text.strip()
            link = "https://finance.yahoo.com" + link_tag["href"] if link_tag["href"].startswith("/") else link_tag["href"]
            company = ticker_tag.text.strip() if ticker_tag else "General Market"
            description = description_tag.text.strip() if description_tag else ""
            img = img_tag["src"] if img_tag else None


            news_list.append({"title": title, "company": company, "url": link, "description": description, "image": img})

    return json.dumps(news_list, indent=2)

def scrape_stock_news(ticker):
    url = f"https://finance.yahoo.com/quote/{ticker}/news/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": f"Failed to fetch news for {ticker}"}

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.find_all("li", class_="stream-item story-item yf-1usaaz9")  # Adjust class if needed

    news_list = []
    for article in articles[:30]:
        title_tag = article.find("h3")
        link_tag = article.find("a")
        description_tag = article.find("p")
        
        if title_tag and link_tag:
            title = title_tag.text.strip()
            link = "https://finance.yahoo.com" + link_tag["href"] if link_tag["href"].startswith("/") else link_tag["href"]
            description = description_tag.text.strip() if description_tag else ""

            news_list.append({"title": title, "url": link, "description": description})

    return json.dumps(news_list, indent=2)

def get_cik_from_ticker(ticker):
    url = "https://www.sec.gov/files/company_tickers.json"
    headers = {
        "User-Agent": "Your Name (your_email@example.com)"
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch company tickers"}
    
    data = response.json()
    
    for company in data.values():
        if company["ticker"].lower() == ticker.lower():
            cik = str(company["cik_str"]).zfill(10)  # Convert to 10-digit CIK
            return cik

    return {"error": "Ticker not found"}

def get_revenue_from_sec(cik):
    url = f"https://data.sec.gov/api/xbrl/companyconcept/CIK{cik}/us-gaap/RevenueFromContractWithCustomerExcludingAssessedTax.json"
    headers = {
        "User-Agent": "Patrick Badiang (patrick.vyn.llanto@gmail.com)"
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch revenue data from SEC"}
    
    return response.json()

def get_eps_from_sec(cik):
    url = f"https://data.sec.gov/api/xbrl/companyconcept/CIK{cik}/us-gaap/EarningsPerShareDiluted.json"
    headers = {
        "User-Agent": "Patrick Badiang (patrick.vyn.llanto@gmail.com)"
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch revenue data from SEC"}
    
    return response.json()

def get_sharesOutstanding_from_sec(cik):
    # This function is not used in the current implementation
    url = f"https://data.sec.gov/api/xbrl/companyconcept/CIK{cik}/us-gaap/WeightedAverageNumberOfDilutedSharesOutstanding.json"
    headers = {
        "User-Agent": "Patrick Badiang (patrick.vyn.llanto@gmail.com)"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch revenue data from SEC"}
    
    return response.json()


@app.route("/api/news", methods=["GET"])
def get_news():
    return jsonify(scrape_yahoo_finance())

@app.route("/stock/news", methods=["GET"])
def get_stock_news():
    ticker = request.args.get("ticker")
    if not ticker:
        return jsonify({"error": "Ticker symbol is required"}), 400
    return jsonify(scrape_stock_news(ticker.upper()))

@app.route("/stock/cik", methods=["GET"])
def get_cik():
    ticker = request.args.get("ticker")
    if not ticker:
        return jsonify({"error": "Ticker symbol is required"}), 400
    cik = get_cik_from_ticker(ticker.upper())
    if cik:
        return jsonify({"CIK": cik})
    else:
        return jsonify({"error": "CIK not found"}), 404
    
@app.route("/stock/revenue", methods=["GET"])
def get_revenue():
    cik = request.args.get("cik")
    if not cik:
        return jsonify({"error": "cik symbol is required"}), 400
    
    if isinstance(cik, dict) and "error" in cik:
        return jsonify(cik), 404
    
    revenue_data = get_revenue_from_sec(cik)
    return jsonify(revenue_data)

@app.route("/stock/eps", methods=["GET"])
def get_eps():
    cik = request.args.get("cik")
    if not cik:
        return jsonify({"error": "cik symbol is required"}), 400
    
    if isinstance(cik, dict) and "error" in cik:
        return jsonify(cik), 404
    
    eps_data = get_eps_from_sec(cik)
    return jsonify(eps_data)

@app.route("/stock/sharesOutstanding", methods=["GET"])
def get_sharesOutstanding():
    cik = request.args.get("cik")
    if not cik:
        return jsonify({"error": "cik symbol is required"}), 400
    
    if isinstance(cik, dict) and "error" in cik:
        return jsonify(cik), 404
    
    sharesOutstanding_data = get_sharesOutstanding_from_sec(cik)
    return jsonify(sharesOutstanding_data)

if __name__ == "__main__":
    app.run( port = 3001)