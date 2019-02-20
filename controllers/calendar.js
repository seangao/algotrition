function calendar(req, res, next) {
  res.render('calendar', { title: 'Calendar' });
}

module.exports = {
    calendar
};
