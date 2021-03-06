var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
const request = require('request');
const syncRequest = require('sync-request');
 
 
var mysql = require('mysql');
var connection  = require('./lib/db');
 
var formRouter = require('./routes/sign-up');
var usersRouter = require('./routes/sign-up');
 
var app = express();
 
// view engine setup
var publicDir = require('path').join(__dirname,'/public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(publicDir));
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
app.use(expressValidator());
 
app.use('/users', usersRouter);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;
