/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');
var unirest = require('unirest');

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

var appEnv = cfenv.getAppEnv();
var server = app.listen(appEnv.port, function() {
  console.log('***********************************');
  console.log('listening:', appEnv.url);
  console.log('***********************************');
});

module.exports = server;

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

app.post('/yoda', function(req, res){
  // These code snippets use an open-source library.
  unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + req.body.phrase)
  .header("X-Mashape-Key", process.env.MASHAPE)
  .header("Accept", "text/plain")
  .end(function (result) {
    res.send(result.body);
  });
});

app.get('/sum', function(req, res){
  res.render('math/sum', {sum: null, numbers: []});
});

app.post('/sum', function(req, res){
  var numbers = req.body.numbers;
  numbers = numbers.split(',');
  var sum = 0;
  for(var i = 0; i < numbers.length; i++){
    sum += (numbers[i] * 1);
  }
  console.log('sum', sum);
  res.render('math/sum', {sum: sum, numbers: numbers});
});

app.get('/distance', function(req, res){
  res.render('math/distance', {p1: {}, p2: {}, distance: null});
});

app.post('/distance', function(req, res){
  var p1 = {x: req.body.p1x * 1, y: req.body.p1y * 1};
  var p2 = {x: req.body.p2x * 1, y: req.body.p2y * 1};
  var x = p1.x - p2.x;
  var y = p1.y - p2.y;
  var distance = Math.sqrt(x*x + y*y);
  res.render('math/distance', {p1: p1, p2: p2, distance: distance});
});

app.get('/', function(req, res){
  res.render('home/index');
});

app.get('/square', function(req, res){
  res.render('math/square', {square: null});
});

app.post('/square', function(req, res){
  console.log(req.body);
  var square = req.body.x * req.body.x;
  res.render('math/square', {square: square});
});

app.get('/dogs', function(req, res){
  res.send('woof woof');
});

app.post('/dogs', function(req, res){
  res.send('just created fido');
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
