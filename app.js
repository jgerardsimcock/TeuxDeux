var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var app = express();


app.get('/', function(req, res){
  res.send('Hello World');
});

//Get

app.get('/../templates/tasks', function(req, res){
  res.render('list.jade');
});

//POST  

//UPDATE

//DELETE


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(methodOverride());


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});