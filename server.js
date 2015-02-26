var request = require("request");
var fs = require("fs");
var express = require('express');
var config = require('./env/config.js');
var app = express();

// Send all requests to the index page
app.get('/*',function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Load loan data for most recent batch of loans
request({
  uri: "https://api.lendingclub.com/api/investor/v1/loans/listing",
  method: "GET",
  timeout: 10000,
  'content-type': 'application/json',
  headers: config,
  data: '{showAll: false}'
}, function(err, res, body) {
  var data = JSON.parse(body);
  console.log(data.loans.length);
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
