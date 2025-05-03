import json

# 1. Load the stock list (a list of dicts)
with open('stock_list.json', 'r') as f:
    stocks = json.load(f)

# 2. Load the company-ticker map (an object whose values contain ticker & cik_str)
with open('company_tickers.json', 'r') as f:
    company_map = json.load(f)

# 3. Build a ticker → CIK lookup (zero‑padded to 10 digits)
ticker_to_cik = {
    entry['ticker']: str(entry['cik_str']).zfill(10)
    for entry in company_map.values()
}

# 4. Merge: for each stock, grab its CIK (if available)
merged = []
for s in stocks:
    sym = s.get('Symbol')
    cik = ticker_to_cik.get(sym)
    merged.append({
        'Symbol':   sym,
        'Name':     s.get('Name', '').strip(),
        'Sector':   s.get('Sector', ''),
        'Industry': s.get('Industry', ''),
        'CIK':      cik or None
    })

# 5. Write out the result
with open('merged_stock_list.json', 'w') as f:
    json.dump(merged, f, indent=4)

print(f'Wrote {len(merged)} records to merged_stock_list.json')
