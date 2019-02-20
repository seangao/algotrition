function profile(req, res, next) {
  res.render('profile', { title: 'My profile', user_id: 'john' });
}

module.exports = {
    profile
};
