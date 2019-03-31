const registerModels = require('../models/register');

function register(req, res, next) {
    res.render('register', { title: 'Register', header_menu: false });
}

async function registerProcess(req, res, next) {
    var user_ans = await registerModels.insertNewUser(req.app.locals.db, req.body);
    req.session.user = true;
    req.session.userid = user_ans.id;
    res.locals.user = true;
    res.redirect('/profile');
}

module.exports = {
  register, registerProcess
};
