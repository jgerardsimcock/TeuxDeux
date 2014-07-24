
//THESE VARIABLES LINK TO DEPENDENCIES IN THE PACKAGE JSON.
var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
mongoose.connect('mongodb://taskuser:1234@ds027709.mongolab.com:27709/teuxdeux')
//THIS VARIABLE IS SO WE CAN CALL METHODS IN EXPRESS ON THE OUR APPLICATION
var app = express();

app.set('views', __dirname + '/templates');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

//THIS CREATES A NEW SCHEMA IN MONGOOSE
var Schema = mongoose.Schema;

var teuxdeuxSchema = new Schema({
  title : String,
  notes: String

});

var Task = mongoose.model('tasks', teuxdeuxSchema);

//Get LIST

app.get('/tasks', function(req, res){
  Task.find(function (err, tasks){
    res.render('tasks/list.jade', {tasks: tasks});
  });
});

// GET NEW
app.get('/tasks/new', function(req, res){
  res.render('tasks/new.jade');
});

// GET SHOW
app.get('/tasks/:id', function(req, res){

  res.render('tasks/edit.jade');
});

// GET EDIT

app.get('/tasks/:id/edit', function(req, res){
console.log(req.params.id)
  res.render('tasks/list.jade');
});


//POST  

app.post('/tasks', function(req,res){
  // console.log(req)
  var newTask = new Task({
    title: req.param('taskTitle'),
    notes: req.param('taskNotes')
  });
  // console.log(newTask);
   // look at docs for params in express

    newTask.save(function(wert, task){
      if(wert){res.send(500, wert);}
      res.redirect('/tasks');
    });
})
//UPDATE

// app.put('/tasks/:Mongo DB', function(req,res){
  
//   var id = req.param('id');

//   TaskItem.findOne({_id: MongoDB Number}, function(){

//   })
// })

//DELETE

// app.put('/items/id', function(req, res))






// app.del('/', function(req,res))







var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});