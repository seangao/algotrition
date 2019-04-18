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

async function editRecipe(req, res, next) {
  let editRecipeId = Object.keys(req.body)[0];
  let recipeInfo = await recipesModels.getRecipeById(req.app.locals.db, editRecipeId);
  recipeInfo = JSON.parse(JSON.stringify(recipeInfo));
  let { ingredients } = recipeInfo;
  ingredients = JSON.parse(ingredients);
  recipeInfo.ingredients = ingredients;
  res.render('editRecipe', { title: 'editRecipe', user: req.session.user, recipe: recipeInfo, recipe_id: recipeInfo.id });
  next();
}

async function saveChange(req, res, next) {
  console.log(req.body);
  const { recipe_id } = req.body;
  const { title } = req.body;
  const ingredients = JSON.stringify(req.body.ingredients);
  const { instruction } = req.body;

  console.log(recipe_id);
  console.log(ingredients);
  console.log(title);
  console.log(instruction);
  const result = await recipesModels.updateRecipeById(req.app.locals.db, recipe_id, title, ingredients, instruction);
  next();
}

module.exports = {
  recipes, getUserRecipe, deleteRecipe, editRecipe, saveChange,
};
