// server.js

var request = require("request");
var fs = require("fs");
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var config = require('./env/config.js');
var Loans = require('./app/models/loans.js');

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
    loans.forEach(function(loan, i) {
      var newLoan = new Loans(loan);
      newLoan.save(function(err) {
        if (err) return console.log(err);
        // Loans.findById(newLoan, function (err, doc) {
        //   if (err) return console.log(err);
        //   console.log(doc);
        // })
      });
    });
    console.log('Retrieved most recent loans.');
  }); //.pipe(fs.createWriteStream('test.txt'));
};

// getLoanData();
Loans.find(function(err, dbLoans) {
  console.log('Got loans from db.')
  loans = dbLoans;
});
// setInterval(getLoanData, 3600000);

fs.readFile(__dirname + '/data/LoanStats3c_securev1.csv', function(err, data) {
  // data = data.toString().replace(/\"/g, '');
  data = data.toString();
  var buffer = data.split('\n');
  var loans = {};
  var loanObj = {};

  var topline = buffer.shift(); // clear initial first line
  var headers = buffer.shift(); // get column headers

  // HACK: split on \",\" and remove \" from beginning and end of line
  headers = headers.split('","');
  headers[0] = headers[0].substring(1, headers[0].length);
  headers[headers.length-1] = headers[headers.length-1].substring(0, headers[headers.length-1].length-1);

  buffer.forEach(function(loan, i) {
      loanObj = {};
      
      // HACK: split on \",\" and remove \" from beginning and end of line
      loan = loan.split('","');
      loan[0] = loan[0].substring(1, loan[0].length);
      loan[loan.length-1] = loan[loan.length-1].substring(0, loan[loan.length-1].length-1);

      loan.forEach(function(value, i) {
        loanObj[headers[i]] = value;
      });

      console.log('Parsed record', i);
      Loans.collection.insert(loanObj, {w: 0});
  });
});

// Listen for requests
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
