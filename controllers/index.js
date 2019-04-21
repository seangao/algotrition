const planModel = require('../models/plan.js');
const profileModels = require('../models/profile');
const fs = require('fs');
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function index(req, res, next) {
  let week;
  let userData;
  if (req.session.user && req.cookies.user_sid) {
    userData = await profileModels.searchUserbyID(req.app.locals.db, req.session.userid);
    console.log(userData);
    const data = await planModel.retrievePlan(req.app.locals.db, req.session.userid);
    if (data.plan == null) {
      week = null;
    } else {
      week = JSON.parse(data.plan);
    }
  } else {
    const weekString = fs.readFileSync('./saved_plans/recipe1.txt').toString('utf-8');
    week = JSON.parse(weekString);
  }
  if (week == null) {
    var ingredients_list = null;
  } else {
    var ingredients_list = {};
    for (var i = 0; i < week.length; i++) {
      let day = week[i];
      for (var j = 0; j < day.meals.length; j++) {
        let meal = day.meals[j];
        for (var k = 0; k < meal.recipes.length; k++) {
          let recipe = meal.recipes[k];
          for (var m = 0; m < recipe.ingredients.length; m++) {
            let ingredient = recipe.ingredients[m];
            const ingredient_amount = ingredient.amount;
            if (ingredient.name in Object.keys(ingredients_list)) {
              ingredients_list[ingredient_name].amount += ingredient_amount;
            } else {
              var new_item = {};
              new_item.ingredient_name = ingredient.name;
              new_item.ingredient_amount = Math.round(ingredient.amount * 100) / 100;
              new_item.ingredient_unit = ingredient.unit;
              new_item.ingredient_aisle = ingredient.aisle;
              ingredients_list[ingredient.name] = new_item;
            }
          }
        }
      }
    }

    var ingredients_by_aisle = {};
    for (ingredient in ingredients_list) {
      if (ingredients_list[ingredient].ingredient_aisle in Object.keys(ingredients_by_aisle)) {
        ingredients_by_aisle[ingredients_list[ingredient].ingredient_aisle].push(ingredients_list[ingredient]);
      } else {
        ingredients_by_aisle[ingredients_list[ingredient].ingredient_aisle] = []
        ingredients_by_aisle[ingredients_list[ingredient].ingredient_aisle].push(ingredients_list[ingredient]);
      }
    }
  }
  console.log(ingredients_by_aisle);

  // construct date object for display
  var d = new Date();
  var date = {};
  date.year = d.getFullYear();
  date.month = monthNames[d.getMonth()];
  date.date = d.getDate();
  date.day = dayNames[d.getDay()];

  res.render('index', { title: 'Algotrition', ingredients: ingredients_by_aisle, date: date, user: req.session.user, userData: userData });
}

module.exports = {
  index,
};
