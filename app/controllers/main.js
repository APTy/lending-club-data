// controllers/main.js

var mongoose = require('mongoose');
var LoanModel = require('../models/loans');
var HistLoan = LoanModel.Historical;

exports.findAverage = function() {
  var query = HistLoan.find();
  var time = startTimer();
  var numLoans;

  query.select('annual_inc');

  query.exec(function(err, loans) {
    if (err) return console.log(err);

    numLoans = loans.length
    console.log('Total loans: ' + loans.length);
    checkTime(time);
    var sum = 0;

    loans.forEach(function(loan) {
      if (loan.annual_inc) {
        sum += Math.floor(+loan.annual_inc);
      }
    });
    console.log('Average income: ' + sum/numLoans);
    checkTime(time);
  });
};

var startTimer = function() {
  return {
    start: new Date(),
    end: new Date()
  };
}

var checkTime = function(time) {
  time.end = new Date();
  console.log((time.end - time.start) + "ms has elapsed.\n");
  time.start = time.end;
};
