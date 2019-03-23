function generator(req, res, next) {
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
  });
}

var optimizer = require('../models/optimizer.js');

function saveGeneratorRequest(req, res, next) {
  //req.body contains the POST request in a JSON format
  console.log(req.body);
  optimizer.optimization();
  res.render('error',{message: 'We\'re working on that', error: {status: 'working on it'}})
}

module.exports = {
  generator, saveGeneratorRequest
};
