function index(req, res, next) {
  res.render('index', { title: 'Algotrition', user: req.session.user });
  next();
}

module.exports = {
  index,
};
