// controllers/main.js

var mongoose = require('mongoose');
var LoanModel = require('../models/loans');
var HistLoan = LoanModel.Historical;

exports.findAverage = function() {
  var query = HistLoan.find();
  var time = startTimer();

  query.select('annual_inc');

  query.exec(function(err, loans) {
    if (err) return console.log(err);

    console.log('Total loans: ' + loans.length);
    checkTime(time);
    var sum = 0;

    loans.forEach(function(loan) {
      sum += (loan.annual_inc/1000);
    });
    console.log('Average income: ' + sum/250);
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
