const recipesModels = require('../models/recipes');

async function recipes(req, res, next) {
  const testRecipes = await recipesModels.getAllRecipes(req.app.locals.db);
  res.render('recipes', { title: 'Recipes', testRecipes, user: req.session.user });
  // next();
}

async function getUserRecipe(req, res) {
  let userRecipes = await recipesModels.getUserRecipes(req.app.locals.db, req.session.userid);
  userRecipes = JSON.parse(JSON.stringify(userRecipes));
  for (let i = 0; i < userRecipes.length; i++) {
    let { ingredients } = userRecipes[i];
    ingredients = JSON.parse(ingredients);
    userRecipes[i].ingredients = ingredients;
  }
  if (userRecipes.length == 0) {
    res.render('recipes', { title: 'Recipes', userRecipes: null, user: req.session.user });
  } else {
    res.render('recipes', { title: 'Recipes', userRecipes, user: req.session.user });
  }
}

async function deleteRecipe(req, res, next) {
  let deleteRecipeId = Object.keys(req.body)[0];
  const result = await recipesModels.deleteRecipe(req.app.locals.db, deleteRecipeId);
  next();
}

module.exports = {
  recipes, getUserRecipe, deleteRecipe,
};
