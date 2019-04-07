function generator(req, res, next) {

  if (!req.session.user)
    res.redirect('/');
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
      units: 'g',
    },
    {
      name: 'Sodium',
      short: 'Na',
      id: 'sodium',
      units: 'g',
    },
    {
      name: 'Calcium',
      short: 'Ca',
      id: 'calcium',
      units: 'g',
    },
    {
      name: 'Iron',
      short: 'Fe',
      id: 'iron',
      units: 'g',
    },
    {
      name: 'Total Saturated Fat',
      short: 'Sat Fat',
      id: 'satfat',
      units: 'g',
    },
    {
      name: 'Total Trans Fat',
      short: 'Trans Fat',
      id: 'transfat',
      units: 'g',
    },
    {
      name: 'Total Sugars',
      short: 'Sugar',
      id: 'sugar',
      units: 'g',
    },
    {
      name: 'Carbohydrate (by difference)',
      short: 'Carbs',
      id: 'carbs',
      units: 'g',
    },
    {
      name: 'Fiber',
      short: 'Fiber',
      id: 'fiber',
      units: 'g',
    },
    {
      name: 'Protein',
      short: 'Protein',
      id: 'protein',
      units: 'g',
    },
    {
      name: 'Vitamin A',
      short: 'Vit A',
      id: 'vita',
      units: 'IU',
    },
    {
      name: 'Vitamin C',
      short: 'Vit C',
      id: 'vitc',
      units: 'g',
    },
    {
      name: 'Energy',
      short: 'Energy',
      id: 'energy',
      units: 'kcal',
    },
    {
      name: 'Total Lipid (Fat)',
      short: 'Fat',
      id: 'fat',
      units: 'g',
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

var optimizer = require('../models/optimizer.js');

async function saveGeneratorRequest(req, res, next) {
  //req.body contains the POST request in a JSON format
  // console.log(req.body);


  const recipes_mod = require('../models/recipes.js');
  let recipes = await recipes_mod.getAllRecipes(req.app.locals.db);
  [model,results] = optimizer.optimization(req.body, recipes);

  if(results['feasible']){

    var calendar = optimizer.return_calendar(model,results);
    await optimizer.write_calendar_file('./saved_plans/recipe1.txt',calendar);
    res.redirect('/calendar');

  } else {

    res.render('error', {
      message: 'Solution not found. Please try again.',
      error: {status: 'No Solution'},
      user: req.session.user,
    });

  }

}

module.exports = {
  generator, saveGeneratorRequest
};
