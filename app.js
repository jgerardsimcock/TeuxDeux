
//THESE VARIABLES LINK TO DEPENDENCIES IN THE PACKAGE JSON.
var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//THIS VARIABLE IS SO WE CAN CALL METHODS IN EXPRESS ON THE OUR APPLICATION
var app = express();



//THIS CREATES A NEW SCHEMA IN MONGOOSE
var Schema = mongoose.Schema

var teuxdeuxSchema = new Schema({
  task_input : String,
  created_at: Date

});

var teuxDeux = mongoose.model('tasks', teuxdeuxSchema);

//Get

app.get('/', function(req, res){
  res.render('tasks/list.jade');
});

app.get('/', function(req, res){
  res.render('tasks/list.jade');
});

app.get('/', function(req, res){
  res.render('tasks/list.jade');
});

//POST  

app.post('/tasks'. function(req,res){
  // var task = new TaskItem(){
  //   // title = req.param('title'),
  //   // notes: req.param('notes')

  //  // look at docs for params in express

  //   // task.save(function(wert, task){
  //   //   if(wert){res.send(500, wert);}
  //   //   res.redirect{'/'};
  //   })
})
//UPDATE

//DELETE


app.set('views', __dirname + '/templates');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.del('/', function(req,res))
app.use(bodyParser.json())
app.use(methodOverride());




var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});