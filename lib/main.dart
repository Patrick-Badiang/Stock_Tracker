import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(StockTrackerApp());
}

class StockTrackerApp extends StatelessWidget {
  const StockTrackerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stock Tracker',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: StockInputScreen(),
    );
  }
}

class StockInputScreen extends StatefulWidget {
  const StockInputScreen({super.key});

  @override
  _StockInputScreenState createState() => _StockInputScreenState();
}

class _StockInputScreenState extends State<StockInputScreen> {
  final TextEditingController _stockController = TextEditingController();
  final TextEditingController _amountController = TextEditingController();
  final FocusNode _stockFocusNode = FocusNode();
  final FocusNode _amountFocusNode = FocusNode();
  DateTime? _selectedDate;

  double? initialStockPrice;
  double? currentStockPrice;
  double? investmentAmount;
  double? gainLoss;
  double? percentage;
  bool isLoading = false;

  final String apiKey = 'IJ63JRBZSNBZ5YEB'; // Replace with a real API key
  final String apiBaseUrl = 'https://www.alphavantage.co/query';

  Future<void> _fetchStockPrices(String symbol) async {
    if (_selectedDate == null || _stockController.text.isEmpty || _amountController.text.isEmpty) {
      return;
    }

    setState(() {
      isLoading = true;
    });

    try {
      investmentAmount = double.tryParse(_amountController.text);
      String formattedDate = DateFormat('yyyy-MM-dd').format(_selectedDate!);

      // Fetch historical stock price
      final historyUrl = Uri.parse('$apiBaseUrl?function=TIME_SERIES_DAILY&symbol=$symbol&apikey=$apiKey');
      final historyResponse = await http.get(historyUrl);
      final historyData = json.decode(historyResponse.body);

      if (historyData['Time Series (Daily)'] != null && historyData['Time Series (Daily)'][formattedDate] != null) {
        initialStockPrice = double.parse(historyData['Time Series (Daily)'][formattedDate]['4. close']);
      } else {
        throw Exception('Historical data unavailable for selected date.');
      }

      // Fetch current stock price
      final currentUrl = Uri.parse('$apiBaseUrl?function=GLOBAL_QUOTE&symbol=$symbol&apikey=$apiKey');
      final currentResponse = await http.get(currentUrl);
      final currentData = json.decode(currentResponse.body);

      if (currentData['Global Quote'] != null) {
        currentStockPrice = double.parse(currentData['Global Quote']['05. price']);
      } else {
        throw Exception('Failed to fetch current stock price.');
      }

      // Calculate gain/loss
      if (initialStockPrice != null && currentStockPrice != null && investmentAmount != null) {
        double sharesBought = investmentAmount! / initialStockPrice!;
        double currentValue = sharesBought * currentStockPrice!;
        gainLoss = currentValue - investmentAmount!;
        percentage = (gainLoss! / investmentAmount!) * 100;
        print('Percentage: $percentage');
      }

      setState(() {});
    } catch (e) {
      print("Error fetching stock data: $e");
    }

    setState(() {
      isLoading = false;
    });
  }

  void _pickDate(BuildContext context) async {
    DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );

    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  @override
  void dispose() {
    _stockController.dispose();
    _amountController.dispose();
    _stockFocusNode.dispose();
    _amountFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // Unfocus input fields when tapping outside
        _stockFocusNode.unfocus();
        _amountFocusNode.unfocus();
      },
      child: Scaffold(
        appBar: AppBar(title: Text('Stock Tracker')),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: _stockController,
                focusNode: _stockFocusNode,
                decoration: InputDecoration(labelText: 'Stock Symbol (e.g. AAPL, TSLA)'),
              ),
              TextField(
                controller: _amountController,
                focusNode: _amountFocusNode,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(labelText: 'Investment Amount (\$)'),
              ),
              SizedBox(height: 10),
              Row(
                children: [
                  Text(_selectedDate == null ? 'Pick Date' : 'Selected: ${DateFormat.yMMMd().format(_selectedDate!)}'),
                  IconButton(icon: Icon(Icons.calendar_today), onPressed: () => _pickDate(context)),
                ],
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => _fetchStockPrices(_stockController.text),
                child: Text('Track Stock'),
              ),
              SizedBox(height: 20),
              isLoading
                  ? Center(child: CircularProgressIndicator())
                  : gainLoss != null
                      ? Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Initial Price: \$${initialStockPrice?.toStringAsFixed(2)}'),
                            Text('Current Price: \$${currentStockPrice?.toStringAsFixed(2)}'),
                            Text(
                              'Gain/Loss: \$${gainLoss?.toStringAsFixed(2)} (${percentage?.toStringAsFixed(2)}%)',
                              style: TextStyle(
                                color: gainLoss! >= 0 ? Colors.green : Colors.red,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        )
                      : Container(),
            ],
          ),
        ),
      ),
    );
  }
}
