# KuStu Stock Tracker

KuStu Stock Tracker will be one service that KuStu will offer to customers. They will be able to analyze their portfolio holdings and analyze future positions. We will strive to make finding data more reliable and more convenient through more visual data. Our audience will be college students and people that are new to the financial field.

What makes this app different from other portfolio trackers is our price, our visual data, and our more modern and clean look. Other portfolio trackers have a steep price to use their platform as well as are hard to look at when looking for new positions.

Through making more visually appealing sections, I believe KuStu Stock Tracker will be a sensational hit for new financial investors.

# Architecture

We will use Alpha Vantage API where we can then look for AWS API calls to reduce price where we can.

## Alpha Vantage Plan

Alpha Vantage has the following price list:

- **75 calls/min** - $49.99
- **150 calls/min** - $99.99
- **300 calls/min** - $149.99
- **600 calls/min** - $199.99
- **1200 calls/min** - $249.99

We will aim for the **300 calls/min plan at $149.99** a month. We may be able to reduce pricing even more.

## Alpha Vantage Use

The Alpha Vantage API has many uses, but we will use it only for fundamental stock data, which includes:

- Stock close price of the day before
- Stock price of when they bought it
- Stock Company Overview, including:
  - Exchange
  - EPS
  - Dividend Yield
  - Dividend per Share
  - EBITDA
  - 50-day SMA

## AWS Use

AWS will help reduce API calls to Alpha Vantage, lowering overall cost.

The main contention of high API calls will be from searching, and this can be solved by having our own 'best match' algorithm through our database.

We will use the following AWS services:

- **API Gateway**
- **Secrets Manager**
- **Lambda**
- **DynamoDB**

## API Gateway

This will point to our Lambda function and will protect us from DDoS attacks.

## Secrets Manager

We will use this service to hold any secrets such as API keys and database names.

## Lambda

We will have many functions to search through our database. These functions will include:

- **Best_Match_To_Search**
- **Portfolios**
- **Portfolio Positions and Data**

## DynamoDB

DynamoDB will be our main database service and will have the following tables:

- **Stocks**
  - Will have all stocks within common exchanges
- **User Portfolios**
  - Will hold a reference to all user portfolios
- **Portfolio Data**
  - Will hold all data related to a portfolio