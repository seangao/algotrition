const optimizer = require('../models/optimizer.js');
const recipesMod = require('../models/recipes.js');
const planModel = require('../models/plan.js');

function generator(req, res) {
  const optimizers = [
    {
      desc: 'Minimize cooking time',
      id: 0,
    },
    {
      desc: 'Minimize cost',
      id: 1,
    },
    {
      desc: 'Minimize calories',
      id: 2,
    },
    {
      desc: 'Maximize calories',
      id: 3,
    },
  ];

  const allergens = [
    'Dairy',
    'Egg',
    'Gluten',
    'Peanut',
    'Seafood',
    'Sesame',
    'Soy',
    'Sulfite',
    'Tree Nuts',
    'Wheat',
  ];

  const diets = [
    'Vegetarian',
    'Vegan',
    'Ketogenic',
  ];

  const nutrients = [
    {
      name: 'Potassium',
      short: 'K',
      id: 'potassium',
      units: 'mg',
      min: 3000,
      max: 4000,
    },
    {
      name: 'Sodium',
      short: 'Na',
      id: 'sodium',
      units: 'mg',
      min: 2000,
      max: 3000,
    },
    {
      name: 'Calcium',
      short: 'Ca',
      id: 'calcium',
      units: 'mg',
      min: 0,
      max: 2000,
    },
    {
      name: 'Iron',
      short: 'Fe',
      id: 'iron',
      units: 'mg',
      min: 0,
      max: 50,
    },
    {
      name: 'Total Saturated Fat',
      short: 'Sat Fat',
      id: 'satfat',
      units: 'g',
      min: 10,
      max: 30,
    },
    {
      name: 'Total Trans Fat',
      short: 'Trans Fat',
      id: 'transfat',
      units: 'g',
      min: 0,
      max: 10,
    },
    {
      name: 'Total Sugars',
      short: 'Sugar',
      id: 'sugar',
      units: 'g',
      min: 0,
      max: 100,
    },
    {
      name: 'Carbohydrates',
      short: 'Carbs',
      id: 'carbs',
      units: 'g',
      min: 200,
      max: 400,
    },
    {
      name: 'Fiber',
      short: 'Fiber',
      id: 'fiber',
      units: 'g',
      min: 20,
      max: 30,
    },
    {
      name: 'Protein',
      short: 'Protein',
      id: 'protein',
      units: 'g',
      min: 30,
      max: 70,
    },
    {
      name: 'Vitamin A',
      short: 'Vit A',
      id: 'vita',
      units: 'IU',
      min: 4000,
      max: 6000,
    },
    {
      name: 'Vitamin C',
      short: 'Vit C',
      id: 'vitc',
      units: 'mg',
      min: 40,
      max: 80,
    },
    {
      name: 'Total Fat',
      short: 'Fat',
      id: 'fat',
      units: 'g',
      min: 50,
      max: 80,
    },
  ];

  res.render('planGenerator', {
    title: 'Plan Generator',
    allergens,
    diets,
    nutrients,
    optimizers,
    user: req.session.user,
  });
}

async function saveGeneratorRequest(req, res, next) {
  // req.body contains the POST request in a JSON format
  // console.log(req.body);

  const recipes = await recipesMod.getAllRecipes(req.app.locals.db);

  let calendar = optimizer.optimization(req.body, recipes);

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
