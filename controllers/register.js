function register(req, res, next) {
  res.render('register', { title: 'Register' });
}

module.exports = {
    register
};
