const loginModels = require('../Models/login')
const profileControllers = require('./profile');

function login(req, res, next) {
  res.render('login', { title: 'Login', header_menu: false });
}

async function loginProcess(req, res, next) {
  var user_ans = await loginModels.searchUser(req.app.locals.db, req.body);
  if (user_ans == null) {
    console.log("User not exist");
    res.render('login', { title: 'Login', header_menu: false });
  } else {
    console.log(user_ans);
    var profile = await profileControllers.generateProfile(user_ans);
    res.render('profile', {title: "My Profile", user : profile});
  }
}

module.exports = {
  login, loginProcess
};
