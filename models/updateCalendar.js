const solver = require('javascript-lp-solver');
const optimizer = require('./optimizer.js');
const planModel = require('./plan.js');
const recipesMod = require('./recipes.js');

async function readCalendar(req) {
  if (!req.session.calendar && req.session.user && req.cookies.user_sid) {
    const calendarString = (
      await planModel.retrievePlan(req.app.locals.db, req.session.userid)
    ).plan;
    req.session.calendar = JSON.parse(calendarString);
  }
}

async function readInputConstraints(req) {
  if (req.session.user && req.cookies.user_sid) {
    const inputConstraintsString = (
      await planModel.retrieveConstraints(req.app.locals.db, req.session.userid)
    ).constraints;
    req.session.constraints = JSON.parse(inputConstraintsString);
  }
}

async function readRejectedRecipes(req) {
  if (req.session.user && req.cookies.user_sid) {
    const rejectedRecipesString = await planModel
      .retrieveRejectedRecipes(req.app.locals.db, req.session.userid);
    req.session.rejectedRecipes = JSON
      .parse(rejectedRecipesString.rejected_recipes);
  }
}

async function writeCalendar(req, calendar) {
  if (req.session.user && req.cookies.user_sid) {
    planModel.insertPlan(req.app.locals.db, req.session.userid, calendar);
  }
}

async function writeRejectedRecipes(req, rejectedRecipes) {
  if (req.session.user && req.cookies.user_sid) {
    planModel.insertRejectedRecipes(req.app.locals.db, req.session.userid, rejectedRecipes);
  }
}

async function deleteRecipeFromCalendar(req, rejectedRecipeId) {
  const { calendar } = req.session;
  const inputConstraints = req.session.constraints;
  const { rejectedRecipes } = req.session;
  // Add new rejected recipe to list and update database
  if (!rejectedRecipes.includes(rejectedRecipeId)) {
    rejectedRecipes.push(rejectedRecipeId);
  }


  // Find location of rejected recipe in calendar object
  let i;
  let j;
  let dayIndex;
  let mealIndex;
  let activeMeal;
  let eatenMeal;
  for (i = 0; i < calendar.length; i++) {
    for (j = 0; j < calendar[i].meals.length; j++) {
      const recipe = calendar[i].meals[j].recipes[0];
      if (recipe.id == rejectedRecipeId) { // bad lint
        dayIndex = i;
        mealIndex = j;
        activeMeal = recipe.active;
        eatenMeal = recipe.eaten;
      }
    }
  }


  // Get list off all recipes names (not ids) which
  // should be excluded from solver (rejected + other planned days)
  const usedRecipeNames = [];
  for (i = 0; i < calendar.length; i++) {
    for (j = 0; j < calendar[i].meals.length; j++) {
      if (i !== dayIndex) {
        usedRecipeNames.push(calendar[i].meals[j].recipes[0].name);
      }
    }
  }
  let singleRecipe;
  for (i = 0; i < rejectedRecipes.length; i++) {
    singleRecipe = await recipesMod.getSpoonRecipeById(req.app.locals.db, rejectedRecipes[i]);
    usedRecipeNames.push(singleRecipe.recipe_name);
  }

  // Call solver with restricted set of recipes
  const model = {
    optimize: inputConstraints.optParameter,
    opType: inputConstraints.optParameterType,
  };

  model.constraints = optimizer.populateConstraints(inputConstraints);
  const recipes = await recipesMod.getAllRecipes(req.app.locals.db);
  model.variables = optimizer.populateRecipeVariables(model.constraints, inputConstraints, recipes);
  const variablesKeys = Object.keys(model.variables);
  for (j = 0; j < variablesKeys.length; j += 1) {
    if (usedRecipeNames.includes(model.variables[variablesKeys[j]].recipe_name)) {
      delete model.variables[variablesKeys[j]];
    }
  }
  const servingNumbers = [0.5, 1, 1.5, 2, 3];
  model.variables = optimizer.duplicateVariables(model.variables, servingNumbers, inputConstraints);
  model.ints = optimizer.populateInts(model.variables);
  const results = solver.Solve(model);

  // Generate output from solver
  if (!results.feasible) {
    rejectedRecipes.pop();
    res.render('error', {
      message: 'Solution cannot be found without the rejected recipe',
      error: { status: 'No Solution' },
      user: req.session.user,
    });
  } else {
    const meals = optimizer.returnMealsForCalendar(model, results, inputConstraints);
    meals[mealIndex].recipes[0].active = activeMeal;
    meals[mealIndex].recipes[0].eaten = eatenMeal;
    calendar[dayIndex].meals = meals;
    writeCalendar(req, calendar);
    writeRejectedRecipes(req, rejectedRecipes);
  }

  return calendar;
}

async function incrementActiveMeal(req, eatenDay, eatenMeal) {
  const { calendar } = req.session;
  calendar[eatenDay].meals[eatenMeal].eaten = true;
  calendar[eatenDay].meals[eatenMeal].active = false;
  // let the lint complain, otherwise we get 0 + 1 = 01
  eatenMeal++;
  if (eatenMeal < calendar[eatenDay].meals.length) {
    calendar[eatenDay].meals[eatenMeal].active = true;
  } else {
    eatenDay++;
    if (eatenDay < calendar.length) {
      calendar[eatenDay].meals[0].active = true;
    }
  }
  writeCalendar(req, calendar);
  return calendar;
}


module.exports = {
  deleteRecipeFromCalendar,
  incrementActiveMeal,
  readCalendar,
  readInputConstraints,
  readRejectedRecipes,
};
