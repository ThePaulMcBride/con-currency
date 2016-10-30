var exchange = require('./exchange');
var args = process.argv.slice(2);
var value;
var currentCurrency;
var desiredCurrency;

if(args[0]) var value = args[0];
if(args[1]) var currentCurrency = args[1].toUpperCase();
if(args[2]) var desiredCurrency = args[2].toUpperCase();

const rates = exchange.rates(currentCurrency)
  .map((response) => {
    if (response.error) {
      throw new Error('Something went wrong');
    }
    return response;
  });

rates.subscribe(
  (rates) => {
    if( !(rates.rates[desiredCurrency]) ) {
      console.log('Unsupported Currency');
      return;
    }

    const newValue = (value * rates.rates[desiredCurrency]).toFixed(2);

    const result = `${value} ${currentCurrency} is worth ${newValue} ${desiredCurrency};`

    console.log(result);
  },
  (e) => {
    console.log('Error: ' + e.message);
  }
);
