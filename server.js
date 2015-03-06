// server.js

var request = require("request");
var fs = require("fs");
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var config = require('./env/config.js');
var db = require('./app/config.js');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

app.get('/api/v1/types',function(req, res){
  res.send(Object.keys(loans[0]).slice(2));
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


// Load loan data for most recent batch of loans
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
    data.loans.forEach(function(loan) {
      // loans.push({
      //   amount: loan.loanAmount,
      //   interest: loan.intRate,
      //   income: loan.annualInc,
      //   'credit util': loan.bcUtil
      // });
    });
    console.log('Retrieved most recent loans.');
  }); //.pipe(fs.createWriteStream('test.txt'));
};

getLoanData();
setInterval(getLoanData, 3600000);

// Listen for requests
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
