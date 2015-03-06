// config.js

var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('opened database');
});

module.exports = db;
