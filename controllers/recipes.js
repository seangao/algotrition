const recipesModels = require('../models/recipes');

async function recipes(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  }
  const test_recipes = await recipesModels.getAllRecipes(req.app.locals.db);
  res.render('recipes', { title: 'Recipes', test_recipes, user: req.session.user });
  // next();
}

module.exports = {
  recipes,
};
