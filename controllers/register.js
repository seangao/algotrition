const registerModels = require('../models/register');
const profileControllers = require('./profile');

function register(req, res, next) {
    res.render('register', { title: 'Register', header_menu: false });
}

async function registerProcess(req, res, next) {
    var user_ans = await registerModels.insertNewUser(req.app.locals.db,
      req.body);
    var profile = await profileControllers.generateProfile(user_ans);
    res.render('profile', {title: "My Profile", user : profile});
}

module.exports = {
  register, registerProcess
};
