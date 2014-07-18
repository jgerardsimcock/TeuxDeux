var mongoose = require('mongoose');
var restify = require('restify');
var jade = require('jade');
// 
mongoose.connect('mongodb://taskuser:1234@ds027709.mongolab.com:27709/teuxdeux')


var Schema = mongoose.Schema;

var teuxdeuxSchema = new Schema({
  task_input:  String,
  created_at: Date
  
  });

var TeuxDeux = mongoose.model('poops', teuxdeuxSchema);

var server = restify.createServer({
    name: 'app',
    version: '0.0.0'
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());




server.get('/', function(req,res){
  var body = " ";


  TeuxDeux.find(function(err, things){
    for(i in things){
      console.log(things[i].task_input);
      body += things[i].task_input+ "<br>";
      
    }

    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    });

    res.write(body);
    res.send();
  });
});


server.post('/task', function (req, res){
  var new_bananas = new TeuxDeux({ //THIS IS PART OF MONGOOSE MODULE
    task_input: req.body.task //THE COMMENT: PART GETS ITS INITIALIZATION FROM LINE 20.
    , created_at: Date.now() 
  });
            //PARAMETER COMMENT WILL BE READING FIELF "COMMENT" FROM CLIENT 
  new_bananas.save(function(err){
  
    res.send("Your comments have been saved");

  });

});


server.listen(1337, function(){
  console.log('%s listening at %s', server.name, server.url);
});