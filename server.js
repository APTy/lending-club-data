// server.js

var request = require("request");
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');

var config = require('./env/config');
var hist = require('./app/hist');
var Loans = require('./app/models/loans');
var app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

//////////////////////////////////////////////////////////////////////
//////////  Routes
//////////////////////////////////////////////////////////////////////
app.get('/api/v1/types',function(req, res){
  res.send(Object.keys(loans[0].toObject()).slice(3));
});

app.get('/api/v1', function(req, res) {
  res.send(loans);
});

app.post('/api/v1', function(req, res) {
  var typesRequested = req.body
  var loansRequested = [];
  var temp;

  loans.forEach(function(loan) {
    temp = {};

    for (var k in typesRequested) {
      var prop = typesRequested[k];
      temp[prop] = loan[prop];
    }

    loansRequested.push(temp);
  });

  res.send(loansRequested);
});

app.use(express.static(__dirname + '/public'));


//////////////////////////////////////////////////////////////////////
//////////  Load recent loan data and store in database
//////////////////////////////////////////////////////////////////////
var loans = [];
var getLoanData = function() {
  request({
    uri: "https://api.lendingclub.com/api/investor/v1/loans/listing",
    method: "GET",
    timeout: 10000,
    'content-type': 'application/json',
    headers: config
  }, function(err, res, body) {
    var data = JSON.parse(body);
    loans = data.loans;
    loans.forEach(function(loan, i) {
      var newLoan = new Loans(loan);
      newLoan.save(function(err) {
        if (err) return console.log(err);
      });
    });
    console.log('Retrieved most recent loans.');
  });
};

// getLoanData();
Loans.find(function(err, dbLoans) {
  console.log('Got loans from db.')
  loans = dbLoans;
});
// setInterval(getLoanData, 3600000);

//////////////////////////////////////////////////////////////////////
//////////  Import historical data from CSV (ONLY NEEDS TO RUN ONCE)
//////////////////////////////////////////////////////////////////////
// hist.importCSV(__dirname + '/data/LoanStats3c_securev1.csv');

// Listen for requests
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
