const recipesModels = require("../models/recipes")

async function recipes(req, res, next) {
    var test_recipes = await recipesModels.getAllRecipes(req.app.locals.db)
    res.render('recipes', { title: 'Recipes', test_recipes: test_recipes });
    next();
}

module.exports = {
   recipes,
};
