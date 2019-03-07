function recipes(req, res, next) {
  res.render('recipes', { title: 'Recipes' });
  next();
}

module.exports = {
   recipes,
};
