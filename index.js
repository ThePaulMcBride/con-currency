var exchange = require('./exchange');
var args = process.argv.slice(2);
var value;
var currentCurrency;
var desiredCurrency;

if(args[0]) var value = args[0];
if(args[1]) var currentCurrency = args[1].toUpperCase();
if(args[2]) var desiredCurrency = args[2].toUpperCase();

exchange.rates(currentCurrency, desiredCurrency, value);
