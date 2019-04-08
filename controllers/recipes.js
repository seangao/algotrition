const recipesModels = require('../models/recipes');

async function recipes(req, res) {
  const testRecipes = await recipesModels.getAllRecipes(req.app.locals.db);
  res.render('recipes', { title: 'Recipes', testRecipes, user: req.session.user });
  // next();
}

module.exports = {
  recipes,
};
