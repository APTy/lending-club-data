// historical.js

var fs = require("fs");
var Loans = require('./models/loans');

var importCSV = function(file) {
  fs.readFile(file, function(err, data) {
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
};

exports.importCSV = importCSV;
