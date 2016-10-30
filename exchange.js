const http = require('http');
const fetch = require('node-fetch');
const Rx = require('rxjs/Rx');

var getRates = function(baseCurrency)
{
  var baseUrl = 'http://api.fixer.io/latest?base=' + baseCurrency;

  return Rx.Observable.fromPromise(fetch(baseUrl))
    .flatMap((response) => {
      return Rx.Observable.fromPromise(response.json());
    });
}

module.exports.rates = getRates;
