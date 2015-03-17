// router.js

var express = require('express');
var config = require('../env/config');
var Loans = require('./models/loans');
var hist = require('./hist');
var router = express.Router();

router.get('/api/v1/types',function(req, res){
  res.send(Object.keys(loans[0].toObject()).slice(3));
});

router.get('/api/v1', function(req, res) {
  res.send(loans);
});

router.post('/api/v1', function(req, res) {
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

Loans.find(function(err, dbLoans) {
  console.log('Got loans from db.')
  loans = dbLoans;
});


module.exports = router;
