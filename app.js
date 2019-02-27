var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//routers import
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var profileRouter = require('./routes/profile');
var planGeneratorRouter = require('./routes/planGenerator');
var calendarRouter = require('./routes/calendar');
var recipesRouter = require('./routes/recipes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routers loading
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/generator', planGeneratorRouter);
app.use('/calendar', calendarRouter);
app.use('/recipes', recipesRouter);

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

//Just use for local debugging purpose; port number can be changed
console.log("Express running at port 3000");
module.exports = app;
