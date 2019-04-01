const loginModels = require('../models/login')

function login(req, res, next) {
    res.render('login', { title: 'Login', header_menu: false });
}

async function loginProcess(req, res, next) {
  var user_ans = await loginModels.searchUser(req.app.locals.db, req.body);
  if (user_ans == null) {
    res.render('login', { title: 'Login', header_menu: false , err : "User does not exist!"});
  } else {
    req.session.user = true;
    req.session.userid = user_ans.id;
    res.locals.user = true;
    res.redirect('/profile');
  }
}

module.exports = {
  login, loginProcess
};
