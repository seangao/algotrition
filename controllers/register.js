function register(req, res, next) {
  res.render('register', { title: 'Register', header_menu: false });
}

module.exports = {
    register
};
