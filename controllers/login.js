function login(req, res, next) {
  res.render('login', { title: 'Login' });
}

module.exports = {
    login
};
