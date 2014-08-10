//We need dependencies
//THESE VARIABLES LINK TO DEPENDENCIES IN THE PACKAGE JSON.
var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var mongoose = require('./mongoose');


var tasks = require('./routes/tasks');
//we need to access the express framework
//THIS VARIABLE IS SO WE CAN CALL METHODS IN EXPRESS ON THE OUR APPLICATION
var app = express();

//THESE ARE USED TO TEST FUNCTIONALITY


var fake_Username = "justin"; 
var fake_Password = "justin";

//some middleware is deprecated in express 4.0 we need to manually install it.
//THIS CONNECTS THE MIDDLEWARE THAT EXPRESS NEEDS 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(session({secret: 'word'}));

//THIS SETS THE VIEWS IN EXPRESS TO OUR TEMPLATES DIRECTORY
app.set('views', __dirname + '/templates');
app.use(express.static(__dirname + '/public'));

app.use('/', tasks);


//Login 

//Login requires several steps. 
//1. USer must input their information
//2. THis information needs to be authenticated
//3. THe server needs to render the users unique information associated with the user
//4. 
// The values that req.param takes is set in the .jade document.
app.post('/login', function(req,res){
  var errors = ''; //THIS CREATES A VARIABLE WITH WILL BECOME A STRING
  if(req.param('username') === undefined || req.param('username') === ''){
    errors = " Missing Username ";
  }  
  if(req.param('password') === undefined || req.param('password') === ''){
    errors += " Missing Password ";
  }
  console.log(req.param('username'));
  // Authenticate
  if(errors.length === 0){
    //fake username and password
    if(req.param('username') === fake_Username && req.param('password')=== fake_Password){
      //this part is fake. We need it to test authentication process
      //we would normally have an entire script or function to help create users
      var user = {
        id: 1,
        username : fake_Username,
        password : fake_Password
      };
      req.session.user = user;
      res.redirect('/tasks');
    } else {
      errors += "Incorrect User Name and Password";
    }
  }
  res.render('users/login.jade', { errors: errors } );
});

app.get('/logout', function(req, res) {
  req.session.user = undefined;
  res.redirect('/login');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
