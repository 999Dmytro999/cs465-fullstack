var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var passport = require('passport');
var environment = require('./app_api/config/environment');
var apiErrorHandler = require('./app_api/utils/api-errors').apiErrorHandler;

require('./app_api/models/db');
require('./app_api/config/passport');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var app = express();
var clientOrigins = new Set(environment.getClientOrigins());

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// Permit configured administrator clients to use the REST API.
app.use('/api', function(req, res, next) {
  var requestOrigin = req.get('Origin');

  if (requestOrigin && clientOrigins.has(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.vary('Origin');
  }

  if (req.method === 'OPTIONS') {
    if (requestOrigin && !clientOrigins.has(requestOrigin)) {
      return res.status(403).json({ message: 'This client origin is not allowed.' });
    }

    return res.sendStatus(204);
  }

  next();
});

app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/api', apiErrorHandler);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
