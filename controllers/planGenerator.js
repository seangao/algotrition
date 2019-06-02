const optimizer = require('../models/optimizer.js');
const recipesMod = require('../models/recipes.js');
const planModel = require('../models/plan.js');

/** Load generate plan form. */
function generator(req, res) {
  const { optimizers } = planModel;
  const { allergens } = planModel;
  const { diets } = planModel;
  const { nutrients } = planModel;

  res.render('planGenerator', {
    title: 'Plan Generator',
    allergens,
    diets,
    nutrients,
    optimizers,
    user: req.session.user,
  });
}

/** Submit generate plan request to optimizer. */
async function saveGeneratorRequest(req, res, next) {
  // req.body contains the POST request in a JSON format

  const recipes = await recipesMod.getAllRecipes(req.app.locals.db);
  const calendar = optimizer.optimization(req.body, recipes);

  if (calendar.length > 0) {
    if (req.session.user && req.cookies.user_sid) {
      planModel.insertPlan(req.app.locals.db, req.session.userid, calendar);
      planModel.insertConstraints(req.app.locals.db, req.session.userid, req.body);
      planModel.insertRejectedRecipes(req.app.locals.db, req.session.userid, []);
    }
    req.session.calendar = calendar;
    req.session.constraints = req.body;
    req.session.rejectedRecipes = [];
    next();
  } else {
    res.render('error', {
      message: 'Solution not found. Please try again.',
      error: { status: 'No Solution' },
      user: req.session.user,
    });
  }
}

module.exports = {
  generator, saveGeneratorRequest,
};
