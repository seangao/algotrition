const registerModels = require('../models/register');
const loginModels = require('../models/login');

function register(req, res) {
  res.render('register', { title: 'Register', header_menu: false });
}

async function registerProcess(req, res, next) {
  const user = await loginModels.searchUser(req.app.locals.db, req.body);
  if (user != null) {
    res.render('register', { title: 'Register', header_menu: false, registererr: 'User exists already!' });
  } else {
    const userAns = await registerModels.insertNewUser(req.app.locals.db, req.body);
    req.session.user = true;
    req.session.userid = userAns.id;
    res.locals.user = true;
    next();
  }
}

module.exports = {
  register, registerProcess,
};
