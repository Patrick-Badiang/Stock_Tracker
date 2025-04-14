import requests

url = "https://www.sec.gov/files/company_tickers.json"
# Properly set headers to comply with SEC website policy
headers = {
    "User-Agent": "Patrick Vyn Badiang (patrickvyn@gmail.com)",
    "Accept-Encoding": "gzip, deflate",
    "Host": "www.sec.gov"
}
response = requests.get(url, headers=headers)

# Check if the request succeeded
if response.status_code == 200:
    with open('company_tickers.json', 'w', encoding='utf-8') as file:
        file.write(response.text)
    print("JSON file downloaded successfully.")
else:
    print(f"Failed to download. Status code: {response.status_code}")
