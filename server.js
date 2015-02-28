var request = require("request");
var fs = require("fs");
var cors = require('cors');
var express = require('express');
var config = require('./env/config.js');
var app = express();

app.use(cors());

app.get('/api/v1',function(req, res){
  console.log('got');
  res.send(loans);
});

app.get('/',function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


// Load loan data for most recent batch of loans
var loans = [];
request({
  uri: "https://api.lendingclub.com/api/investor/v1/loans/listing",
  method: "GET",
  timeout: 10000,
  'content-type': 'application/json',
  headers: config
}, function(err, res, body) {
  var data = JSON.parse(body);
  data.loans.forEach(function(loan) {
    loans.push({
      amount: loan.loanAmount,
      interest: loan.intRate
    });
  });
  console.log('Retrieved most recent loans.');
}); //.pipe(fs.createWriteStream('test.txt'));



// Listen for requests
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


/*
curl -v -X GET \
-H "Content-type: application/json" \
-H "Authorization: 1DhQpYKsc/JBKZ/OmAHRPaYSgUo=" \
-d "{showAll: false}" https://api.lendingclub.com/api/investor/v1/loans/listing
*/
