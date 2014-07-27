
//THESE VARIABLES LINK TO DEPENDENCIES IN THE PACKAGE JSON.
var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
mongoose.connect('mongodb://taskuser:1234@ds027709.mongolab.com:27709/teuxdeux');
//THIS VARIABLE IS SO WE CAN CALL METHODS IN EXPRESS ON THE OUR APPLICATION
var app = express();


//THIS SETS THE VIEWS IN EXPRESS TO OUR TEMPLATES DIRECTORY
app.set('views', __dirname + '/templates');


//THIS CONNECTS THE MIDDLEWARE THAT EXPRESS NEEDS 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

//THIS CREATES A NEW SCHEMA IN MONGOOSE
var Schema = mongoose.Schema;

// THIS INITIALIZES THE SCHEMA WITH THE VARIABLE TUEXDEUXSCHEMA
var teuxdeuxSchema = new Schema({
  title : String, //THIS IS ONE FIELD
  notes: String,  //THIS IS ANOTHER FIELD TO SEARCH ON
  created_at: Date,
  checked: Boolean
});

//THIS ASSIGNS A VARIABLE TASK SO WE CAN CALL METHODS IN MONGOOSE 
var Task = mongoose.model('tasks', teuxdeuxSchema);

//Get LIST
//The user sees url/tasks and this sends a get request to server
app.get('/tasks', function(req, res){
  Task.find(function (err, task){
    res.render('tasks/list.jade', {taskCollection: task});
  });
});

// GET NEW
//THIS RENDERS THE PAGE WITH THE EMPTY FORMS TO BE SUBMITTED
app.get('/tasks/new', function(req, res){
  res.render('tasks/new.jade');
});

// GET SHOW
app.get('/tasks/:id', function(req, res){
  //THIS CALLS THE FINDBYID METHOD ON OUR TASK MODEL
Task.findById(req.param.id, function (err, task){
    res.render('tasks/show.jade', {task: task});
  });
});

//I WANT TO CREATE A BUTTON THAT LINKS TO THE EDIT URL FROM THE SHOW PAGE

// GET EDIT
//THIS RENDERS AN EDIT PAGE WHERE YOU CAN EDIT TASKS
app.get('/tasks/:id/edit', function(req, res){
Task.findById(req.param.id, function (err, task){
    res.render('tasks/edit.jade', {task: task});
  });
});
//HOW CAN I GET THE EDIT FUNCTION TO RENDER TWO INPUT FIELDS THAT DEFAULT TO THE VALUES ASSOCIATED WITH THE ID


//POST  
//WHEN I CLICK SUBMIT BUTTON THE APPLICATION POSTS TO THE SERVER AND REDIRECTS TO /TASKS
app.post('/tasks', function(req,res){
  //WE CREATE A VARIABLE THAT POINTS TO OUR MODEL 
  var newTask = new Task({
    title: req.param('taskTitle'),
    notes: req.param('taskNotes')
  });
//THEN WE CALL THE SAVE METHOD ON THAT VARIABLE THAT POINTS TO OUR MODEL 
    newTask.save(function(wert, task){
      if(wert){res.send(500, wert);}
      res.redirect('/tasks');
    });
});

app.post('/tasks/completed/:id', function(req,res){
  Task.findById(req.param('id'), function(err, task){
    task.checked = !task.checked;
    task.save(function(err, t){
      if(err) res.send(500, err);
      res.redirect('/tasks');
      console.log("Hi Justin");
    });
  });  
});
//UPDATE

app.put('/tasks/:id', function(req,res){
  var id = req.param.id;
  Task.findOneAndUpdate(
    {_id: id}, 
    {
      title: req.param("taskTitle"), 
      notes: req.param("taskNotes")
    }, 
    function(err, task){
      res.redirect('/tasks');
    });
});

//DELETE

app.delete('/tasks/:id', function(req, res){
 Task.findByIdAndRemove(req.param('id'), function(err, task){
    res.redirect('/tasks');
 });
});






// app.del('/', function(req,res))







var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});