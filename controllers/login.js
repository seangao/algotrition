const bcrypt = require('bcrypt');
const loginModels = require('../models/login');

function login(req, res, next) {
  if (!req.session.user) {
    res.render('login', { title: 'Login', header_menu: false });
  } else next();
}

async function loginProcess(req, res, next) {
  const userAns = await loginModels.searchUser(req.app.locals.db, req.body);
  if (userAns == null) {
    res.render('login', { title: 'Login', header_menu: false, loginerr: 'User does not exist!' });
  } else if (!bcrypt.compareSync(req.body.password, userAns.password)) {
    res.render('login', { title: 'Login', header_menu: false, loginerr: 'Wrong password!' });
  } else {
    req.session.user = true;
    req.session.userid = userAns.id;
    res.locals.user = true;
    next();
  }
}

async function forgotPassword(req, res) {
  await loginModels.changePasswordbyUsername(req.app.locals.db, req.body);
  res.redirect('/');
}

module.exports = {
  login, loginProcess, forgotPassword,
};
