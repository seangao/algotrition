const bcrypt = require('bcrypt');
const loginModels = require('../models/login');

function login(req, res, next) {
  res.render('login', { title: 'Login', header_menu: false });
}

async function loginProcess(req, res, next) {
  const user_ans = await loginModels.searchUser(req.app.locals.db, req.body);
  if (user_ans == null) {
    res.render('login', { title: 'Login', header_menu: false, loginerr: 'User does not exist!' });
  } else if (!bcrypt.compareSync(req.body.password, user_ans.password)) {
    res.render('login', { title: 'Login', header_menu: false, loginerr: 'Wrong password!' });
  } else {
    req.session.user = true;
    req.session.userid = user_ans.id;
    res.locals.user = true;
    next();
  }
}

async function forgotPassword(req, res, next) {
  await loginModels.changePasswordbyUsername(req.app.locals.db, req.body);
  res.redirect('/');
}

module.exports = {
  login, loginProcess, forgotPassword,
};
