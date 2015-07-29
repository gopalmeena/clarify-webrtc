'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');

var config = require('./config');
var routes = require('./routes/index');
var contacts = require('./routes/contacts');
var calls = require('./routes/calls');
var records = require('./routes/records');
require('./middleware/passport')();

var app = express();
mongoose.connect(config.mongodb.URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(session({
  secret: config.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', routes);
app.use('/contacts', contacts);
app.use('/calls', calls);
app.use('/records', records);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);
var io = require('socket.io')(server),
  broker = require('./brokers/calls.broker');

app.set('io', io);
io.on('connection', function(socket){
  broker.authorize(socket);
  socket.io = io;
});


server.listen(3000);

module.exports = app;
