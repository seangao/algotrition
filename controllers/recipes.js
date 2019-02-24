function recipes(req, res, next) {
  res.render('recipes', { title: 'Recipes' });
}

module.exports = {
    recipes
};
