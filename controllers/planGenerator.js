function generator(req, res, next) {
  res.render('planGenerator', { title: 'Plan Generator' });
}

module.exports = {
    generator
};
