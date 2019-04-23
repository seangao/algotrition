const url = require('url');
const fs = require('fs');
const planModel = require('../models/plan.js');
const profileModels = require('../models/profile');
const updateCalendar = require('../models/updateCalendar.js');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function index(req, res, next) {
  const week = req.session.calendar;
  let nextMeal;
  let userData;
  if (req.session.user && req.cookies.user_sid) {
    userData = await profileModels.searchUserbyID(req.app.locals.db, req.session.userid);
  }
  const queryData = url.parse(req.url, true).query;
  if (queryData.eaten_day) {
    updateCalendar.incrementActiveMeal(req, queryData.eaten_day, queryData.eaten_meal);
  }
  if (week == null) {
    var ingredients_list = null;
  } else {
    var ingredients_list = {};
    for (let i = 0; i < week.length; i++) {
      const day = week[i];
      for (let j = 0; j < day.meals.length; j++) {
        const meal = day.meals[j];
        if (meal.active && !meal.eaten) {
          nextMeal = meal;
          nextMeal.weekId = i;
          nextMeal.mealId = j;
        }
        for (let k = 0; k < meal.recipes.length; k++) {
          const recipe = meal.recipes[k];
          for (let m = 0; m < recipe.ingredients.length; m++) {
            const ingredient = recipe.ingredients[m];
            const ingredient_amount = ingredient.amount;
            if (ingredient.name in Object.keys(ingredients_list)) {
              ingredients_list[ingredient_name].amount += ingredient_amount;
            } else {
              const new_item = {};
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
      const ingredient_aisle = ingredients_list[ingredient].ingredient_aisle
        .split(';')[0];
      if (ingredients_by_aisle.hasOwnProperty(ingredient_aisle)) {
        ingredients_by_aisle[ingredient_aisle].push(ingredients_list[ingredient]);
      } else {
        ingredients_by_aisle[ingredient_aisle] = [ingredients_list[ingredient]];
      }
    }
  }

  // construct date object for display
  const d = new Date();
  const date = {};
  date.year = d.getFullYear();
  date.month = monthNames[d.getMonth()];
  date.date = d.getDate();
  date.day = dayNames[d.getDay()];

  res.render('index', {
    nutrients: {},
    title: 'Algotrition',
    ingredients: ingredients_by_aisle,
    date,
    user: req.session.user,
    userData,
    nextMeal,
  });
}

module.exports = {
  index,
};
