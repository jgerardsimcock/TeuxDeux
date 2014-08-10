var mongoose = require('mongoose');
mongoose.connect('mongodb://taskuser:1234@ds027709.mongolab.com:27709/teuxdeux');
module.exports = mongoose;