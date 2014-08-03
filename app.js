

//We need dependencies
//THESE VARIABLES LINK TO DEPENDENCIES IN THE PACKAGE JSON.
var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
mongoose.connect('mongodb://taskuser:1234@ds027709.mongolab.com:27709/teuxdeux');

//we need to access the express framework
//THIS VARIABLE IS SO WE CAN CALL METHODS IN EXPRESS ON THE OUR APPLICATION
var app = express();

var fake_Username = "justin";
var fake_Password = "justin";

//THIS SETS THE VIEWS IN EXPRESS TO OUR TEMPLATES DIRECTORY



//some middleware is deprecated in express 4.0 we need to manually install it.
//THIS CONNECTS THE MIDDLEWARE THAT EXPRESS NEEDS 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

app.set('views', __dirname + '/templates');
app.use(express.static(__dirname + '/public'));

//You need to create a schema in Mongoose
//THIS CREATES A NEW SCHEMA IN MONGOOSE
var Schema = mongoose.Schema;

//We need to set up our schema for the collection
// THIS INITIALIZES THE SCHEMA WITH THE VARIABLE TUEXDEUXSCHEMA
var teuxdeuxSchema = new Schema({
  title : String, //THIS IS ONE FIELD
  notes: String,  //THIS IS ANOTHER FIELD TO SEARCH ON
  created_at: Date,
  checked: Boolean //We need this later to highlight the completed tasks
});

//We need to create a variable that can be referred to later
//THIS ASSIGNS A VARIABLE TASK SO WE CAN CALL METHODS IN MONGOOSE 
var Task = mongoose.model('tasks', teuxdeuxSchema);//'tasks' will show up in mongodb. TeuxdeuxSchema refers to our schema name

//Get LIST

//The user sees url/tasks and this sends a get request to server
app.get('/tasks', function(req, res){//you need / in the route for 
  Task.find(function (err, task){ //.find is a mongoose method to find a particular object
    res.render('tasks/list.jade', {taskCollection: task}); //
  });
});

// GET NEW
//THIS RENDERS THE PAGE WITH THE EMPTY FORMS TO BE SUBMITTED
app.get('/tasks/new', function(req, res){  
  res.render('tasks/new.jade');
});

// GET SHOW
app.get('/tasks/:id', function(req, res){
  var id = req.params.id;
  // //THIS CALLS THE FINDBYID METHOD ON OUR TASK MODEL
  Task.findById(id, function (err, task){
    res.render('tasks/show.jade', {task: task});
  });
});

//I WANT TO CREATE A BUTTON THAT LINKS TO THE EDIT URL FROM THE SHOW PAGE

// GET EDIT
//THIS RENDERS AN EDIT PAGE WHERE YOU CAN EDIT TASKS
app.get('/tasks/:id/edit', function(req, res){
  Task.findById(req.params.id, function (err, task){
    res.render('tasks/edit.jade', {task: task});
  });
});
//HOW CAN I GET THE EDIT FUNCTION TO RENDER TWO INPUT FIELDS THAT DEFAULT TO THE VALUES ASSOCIATED WITH THE ID


//LOGIN

app.get('/login', function(req, res){

  res.render('users/login.jade');
});


//Password Login 

app.post('/login', function(req,res){
  var errors = [];
  if(req.params.username === undefined || req.params.username === ''){
    errors.push("Missing Username");
  }  
  if(req.params.password === undefined || req.params.password === ''){
    errors.push("Missing Password");
  }

  //Authenticate
  if(errors.length === 0){
    //fake username and password
    if(req.params.username == fake_Username && req.params.password === fake_Password)
     res.redirect('/tasks');
  } else{

  }
  
});


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
  Task.findById(req.params.id, function(err, task){
    task.checked = !task.checked; //this will change the state of .checked to its opposite
    task.save(function(err, t){
      if(err) res.send(500, err);
      res.redirect('/tasks');
      console.log("Hi Justin");
    });
  });  
});
//UPDATE

app.put('/tasks/:id', function(req,res){
  var id = req.params.id;
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
 Task.findByIdAndRemove(req.params.id, function(err, task){
    res.redirect('/tasks');
 });
});



var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
