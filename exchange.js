var http = require('http');

var getRates = function(currentCurrency, desiredCurrency, value)
{
    http.get('http://api.fixer.io/latest?base=' + currentCurrency, function(res){

        var body = ''; // Will contain the final response

        // Received data is a buffer.
        // Adding it to our body
        res.on('data', function(data){
            body += data;
        });

        // After the response is completed, parse it and log it to the console
        res.on('end', function() {
            var parsed = JSON.parse(body);
            var rates = parsed.rates;

            if(!currentCurrency || !value || !desiredCurrency)
            {
                console.error('No value or currency provided.');
            }

            var desiredValue = value * rates[desiredCurrency];

            var result = value + ' ' + currentCurrency + ' is worth ' + desiredValue + ' ' + desiredCurrency;

            console.log(result);
        });
    });
}

module.exports.rates = getRates;
