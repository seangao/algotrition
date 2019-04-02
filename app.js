const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');

const app = express();

// routers import
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const profileRouter = require('./routes/profile');
const planGeneratorRouter = require('./routes/planGenerator');
const calendarRouter = require('./routes/calendar');
const recipesRouter = require('./routes/recipes');
const logoutRouter = require('./routes/logout');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//parsing requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid', secret: 'somerandonstuffs',
  resave: false, saveUninitialized: false,
  cookie: { expires: 600000 }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user)
      res.clearCookie('user_sid');
  next();
});

app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/generator', planGeneratorRouter);
app.use('/calendar', calendarRouter);
app.use('/recipes', recipesRouter);

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/profile');
  } else {
      next();
  }
};

// routers loading
app.use('/', sessionChecker, loginRouter);
app.use('/login', sessionChecker, loginRouter);
app.use('/register', sessionChecker, registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// add database to app's local prototype. Available to all controllers
const config = require('./config')
app.locals.db = pgp(config.databaseURL);

// port number can be changed for testing purpose
console.log('Express running at port 3000');
module.exports = app;