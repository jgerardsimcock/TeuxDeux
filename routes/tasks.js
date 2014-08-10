var mongoose = require('../mongoose');
var express = require('express');
var router = express.Router();


module.exports = router;

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


//USer Authorization
router.use('/tasks', function(req, res, next){
  if( req.session.user !== undefined){
    next();
  } else {//not logged in
    res.redirect('/login');
  }
});


//Get LIST

//The user sees url/tasks and this sends a get request to server
router.get('/tasks', function(req, res){//you need / in the route for 
      Task.find(function (err, task){//THIS IS MONGODB METHOD .FIND
        res.render('tasks/list.jade', {taskCollection: task}); //THE SECOND ARGUMENT MUST MATCH THE FUNCTION ARGUMENT
    });
});

// GET NEW
//THIS RENDERS THE PAGE WITH THE EMPTY FORMS TO BE SUBMITTED
router.get('/tasks/new', function(req, res){  
  res.render('tasks/new.jade');
});

// GET SHOW
router.get('/tasks/:id', function(req, res){
  var id = req.params.id;
  // //THIS CALLS THE FINDBYID METHOD ON OUR TASK MODEL
  Task.findById(id, function (err, task){
    res.render('tasks/show.jade', {task: task});
  });
});

//I WANT TO CREATE A BUTTON THAT LINKS TO THE EDIT URL FROM THE SHOW PAGE

// GET EDIT
//THIS RENDERS AN EDIT PAGE WHERE YOU CAN EDIT TASKS
router.get('/tasks/:id/edit', function(req, res){
  Task.findById(req.params.id, function (err, task){//FINDBYID IS ANOTHE MONGODB METHOD
    res.render('tasks/edit.jade', {task: task});
  });
});
//HOW CAN I GET THE EDIT FUNCTION TO RENDER TWO INPUT FIELDS THAT DEFAULT TO THE VALUES ASSOCIATED WITH THE ID


//LOGIN

router.get('/login', function(req, res){

  res.render('users/login.jade');
});





//POST  
//WHEN I CLICK SUBMIT BUTTON THE APPLICATION POSTS TO THE SERVER AND REDIRECTS TO /TASKS
router.post('/tasks', function(req,res){
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

//if we need to interact dynamically with forms and views we need to create some way to communicate to the server that the user has made changes to the form.
router.post('/tasks/completed/:id', function(req,res){
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

router.put('/tasks/:id', function(req,res){
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

router.delete('/tasks/:id', function(req, res){
 Task.findByIdAndRemove(req.params.id, function(err, task){
    res.redirect('/tasks');
 });
});

