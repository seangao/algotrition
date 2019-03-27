const optimizer = require('../models/optimizer.js');

function recipes(req, res, next) {
  test_recipes = optimizer.get_recipe_array('abc');
  res.render('recipes', { title: 'Recipes', test_recipes: test_recipes });
  next();
}

module.exports = {
   recipes,
};
