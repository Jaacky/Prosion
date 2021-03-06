var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'),
    helmet = require('helmet'),
    session = require('express-session'),
    flash = require('connect-flash'),
    multer = require('multer'),
    upload = multer({dest: './public/images/uploads'}),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/User.js');

var config = require('./config.js')();

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function(callback) {
//   console.log("~~~~~~~~~~~~~~~~~~~~~");
//   console.log("Displaying all users in db");
//   User.find({}, function(err, users) {
//     console.log("users ", users);
//     console.log("~~~~~~~~~~~~~~~~~~~~~");
//   });
// }); 
var routes = require('./routes/index');
var profile = require('./routes/profile');
var graph = require('./routes/graph');
var find = require('./routes/find');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: config.sessionId,
                          cookie: { maxAge: 1200000},
                          resave: true,
                          saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

// Make db accessible to router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use('/', routes);
app.use('/profile', profile);
app.use('/graph', graph);
app.use('/find', find);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
