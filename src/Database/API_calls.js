// Assuming your bundler supports JSON imports
import companyData from './company_tickers.json';

export function getCikFromTicker(ticker) {
  for (const company of Object.values(companyData)) {
    if (company.ticker.toLowerCase() === ticker.toLowerCase()) {
      return String(company.cik_str).padStart(10, '0');
    }
  }
  return { error: "Ticker not found" };
}
