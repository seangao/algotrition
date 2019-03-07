const registerModels = require('../models/register');

async function register(req, res, next) {
    res.render('register', { title: 'Register', header_menu: false });
}

async function registerProcess(req, res, next) {
    var user = registerModels.registerProcess(req.app.locals.db, req.body);
    res.render('profile', { user: user });
}

module.exports = {
  register, registerProcess
};
