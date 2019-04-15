const recipesModels = require('../models/recipes');

async function recipes(req, res, next) {
  const testRecipes = await recipesModels.getAllRecipes(req.app.locals.db);
  res.render('recipes', { title: 'Recipes', testRecipes, user: req.session.user });
  // next();
}

async function saveRecipe(req, res, next) {
  const title = req.body.title;
  const ingredients = JSON.stringify(req.body.ingredients);
  const instruction = req.body.instruction;
  // console.log(req.session);
  // console.log(typeof ingredients);
  const test = await recipesModels.saveNewRecipe(req.app.locals.db, req.session.userid, title, ingredients, instruction);
  next();
}

async function getUserRecipe(req, res) {
  var userRecipes = await recipesModels.getUserRecipes(req.app.locals.db, req.session.userid);
  userRecipes = JSON.parse(JSON.stringify(userRecipes));
  for (var i=0; i < userRecipes.length; i++) {
      var ingredients = userRecipes[i].ingredients;
      ingredients = JSON.parse(ingredients);
      userRecipes[i].ingredients = ingredients;
  }
  if (userRecipes.length == 0) {
      res.render('recipes', { title: 'Recipes', userRecipes: null, user: req.session.user });
  }
  else {
      res.render('recipes', { title: 'Recipes', userRecipes: userRecipes, user: req.session.user });
  }
}

module.exports = {
  recipes, saveRecipe, getUserRecipe,
};
