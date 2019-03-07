function index(req, res, next) {
  res.render('index', { title: 'Express' });
  next();
}

module.exports = {
  index,
};
