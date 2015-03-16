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

//try using 'csv-parser'
// fs.readFile(__dirname + '/data/LoanStats3c_securev1.csv', function(err, data) {
// //   var buffer = data.toString();
// // console.log(buffer);
// //   parser(buffer, function(err, output) {
// //     console.log(output);
// //   });
//
//   data = data.toString().replace(/\"/g, '');
//   var buffer = data.split('\n');
//   var loans = {};
//   var loanObj = {};
//
//   var topline = buffer.shift(); // clear initial first line
//   var headers = buffer.shift(); // get column headers
//
//   headers = headers.split(',');
//
//   buffer.forEach(function(loan, i) {
//     loanObj = {};
//     loan = loan.split(',');
//
//     loan.forEach(function(value, i) {
//       loanObj[headers[i]] = value;
//     });
//
//     loans[loan[0]] = loanObj;
//     console.log(i);
//   });
//
//   console.log(loans);
// });

// Listen for requests
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
