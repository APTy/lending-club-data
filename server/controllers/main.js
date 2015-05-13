// controllers/main.js

var mongoose = require('mongoose');
var LoanModel = require('../models/loans');
var util = require('../core/utilities');
var HistLoan = LoanModel.Historical;

exports.findAverage = function() {
  var cursor = HistLoan.find();
  var checkTime = util.startTimer();
  var numLoans = 0;
  var sum = 0;

  var stream = cursor.limit(1000).stream();

  stream.on('data', function(data) {
    numLoans++;
    sum += data.annual_inc;
  });

  stream.on('close', function() {
    console.log('Average income:', sum / numLoans);
    checkTime();
  });
};
