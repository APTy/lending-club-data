// router.js

var express = require('express');
var request = require("request");

var config = require('../env/config');
var ctrl = require('./controllers/main');
var LoanModel = require('./models/loans');
var LoanTypes = require('./models/dictionary').types;

var CurrentLoan = LoanModel.Current;
var router = express.Router();

router.get('/api/v1/types',function(req, res){
  res.send(Object.keys(LoanTypes));
});

router.get('/api/v1', function(req, res) {
  res.send(loans);
});

router.post('/api/v1', function(req, res) {
  var typesRequested = req.body;
  var loansRequested = [];
  var temp;

  loans.forEach(function(loan) {
    temp = {};

    for (var k in typesRequested) {
      var prop = typesRequested[k];
      temp[prop] = loan[LoanTypes[prop]];
    }

    loansRequested.push(temp);
  });

  res.send(loansRequested);
});

//////////////////////////////////////////////////////////////////////
//////////  Load recent loan data and store in database
//////////////////////////////////////////////////////////////////////
var loans = [];

var getLoansFromDB = function() {
  CurrentLoan.find(function(err, dbLoans) {
    if (dbLoans.length !== 0) {
      console.log('Retrieved most recent loans from mongo.')
      loans = dbLoans;
    } else {
      console.log('Loans aren\'t available in mongo, checking Lending Club');
      getLoanData();
    }
  });
};

var getLoanData = function() {
  request({
    uri: "https://api.lendingclub.com/api/investor/v1/loans/listing",
    method: "GET",
    timeout: 10000,
    'content-type': 'application/json',
    headers: config
  }, function(err, res, body) {
    loans = JSON.parse(body).loans;
    loans.forEach(function(loan, i) {
      var newLoan = new CurrentLoan(loan);
      newLoan.save(function(err) {
        if (err) return console.log(err);
      });
    });
    console.log('Retrieved most recent loans from Lending Club.');
  });
};

// getLoansFromDB();

ctrl.findAverage();

module.exports = router;
