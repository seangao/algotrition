const recipesModels = require('../models/recipes');

async function addRecipePage(req, res, next) {
  res.render('addRecipe', { title: 'Add Recipe', user: req.session.user });
  // next();
}

async function saveRecipe(req, res, next) {
  const { title } = req.body;
  const ingredients = JSON.stringify(req.body.ingredients);
  const { instruction } = req.body;
  // console.log(req.session);
  // console.log(typeof ingredients);
  // console.log(ingredients);
  const test = await recipesModels.saveNewRecipe(req.app.locals.db, req.session.userid, title, ingredients, instruction);
  next();
}

module.exports = {
  addRecipePage, saveRecipe,
};
