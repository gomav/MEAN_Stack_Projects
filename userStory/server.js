var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://root:xnav11manx@ds061189.mongolab.com:61189/userstory", function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


var api = require('./app/routes/api')(app, express);
app.use('/api', api);

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(8441, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Listening on port 8441");
  }
});
