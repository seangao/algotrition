const registerModels = require('../models/register');
const loginModels = require('../models/login');

function register(req, res, next) {
  res.render('register', { title: 'Register', header_menu: false });
}

async function registerProcess(req, res, next) {
  const user = await loginModels.searchUser(req.app.locals.db, req.body);
  if (user != null) {
    console.log('User exits already!');
    res.render('register', { title: 'Register', header_menu: false, registererr: 'User exists already!' });
  } else {
    const user_ans = await registerModels.insertNewUser(req.app.locals.db, req.body);
    req.session.user = true;
    req.session.userid = user_ans.id;
    res.locals.user = true;
    next();
  }
}

module.exports = {
  register, registerProcess,
};
