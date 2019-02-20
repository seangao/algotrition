function generator(req, res, next) {
  res.render('planGenerator', { title: 'generator' });
}

module.exports = {
    generator
};
