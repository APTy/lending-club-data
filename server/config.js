// config.js

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lending-club')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Opened mongo database.');
});

module.exports = db;
