var user = require('../models/user');

function profile(req, res, next) {
  var user_id = 42;
  var user_info = user.get_info(user_id);
  res.render(
    'profile',
    { title: 'My profile', user_id: user_id, user_info: user_info }
  );
}

module.exports = {
    profile
};
