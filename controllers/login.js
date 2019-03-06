function login(req, res, next) {
  res.render('login', { title: 'Login', header_menu: false });
}

module.exports = {
  login,
};
