function passwordReset(req, res) {
  res.render('passwordReset', { title: 'Reset Password', header_menu: false });
}

module.exports = {
  passwordReset,
};
