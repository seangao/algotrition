function logout(req, res) {
  req.session.destroy();
  res.locals.user = false;
  res.render('login', { title: 'Login', header_menu: false });
}

module.exports = {
  logout,
};
