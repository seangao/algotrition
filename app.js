const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const enforce = require('express-sslify');

const app = express();

// routers import
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const passwordResetRouter = require('./routes/passwordReset');
const profileRouter = require('./routes/profile');
const planGeneratorRouter = require('./routes/planGenerator');
const calendarRouter = require('./routes/calendar');
const recipesRouter = require('./routes/recipes');
const addRecipeRouter = require('./routes/addRecipe');
const logoutRouter = require('./routes/logout');
const indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// force HTTPS redirect
if (app.get('env') === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// parsing requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize express-session to allow us track the logged-in user across sessions.
let sessionsettings = {};
try { sessionsettings = require('./keys'); } catch (e) { sessionsettings = null; }
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 600000 },
}));

app.use('/generator', planGeneratorRouter);
app.use('/calendar', calendarRouter);
app.use('/', indexRouter);
app.use('/index', indexRouter);

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/profile');
  } else {
    next();
  }
};

// routers loading
app.use('/login', sessionChecker, loginRouter);
app.use('/register', sessionChecker, registerRouter);
app.use('/passwordReset', sessionChecker, passwordResetRouter);

// middleware function to check for logged-out users
function outSessionChecker(req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect('/login');
  }
}
app.use('/logout', outSessionChecker, logoutRouter);
app.use('/recipes', outSessionChecker, recipesRouter);
app.use('/addRecipe', outSessionChecker, addRecipeRouter);
app.use('/profile', outSessionChecker, profileRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// add database to app's local prototype. Available to all controllers
const config = require('./config');

app.locals.db = pgp(config.databaseURL);

// port number can be changed for testing purpose
module.exports = app;
