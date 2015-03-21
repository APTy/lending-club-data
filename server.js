// server.js

var request = require("request");
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var hist = require('./app/hist')
var routes = require('./app/routes');

var app = express();

// Parse json and allow cross-origin requests
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

// Apply routes and serve page
app.use('/', routes);
app.use(express.static(__dirname + '/public'));

// Listen for requests
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

// Import historical data from CSV (ONLY NEEDS TO RUN ONCE)
// hist.importCSV(__dirname + '/data/LoanStats3c_securev1.csv');
