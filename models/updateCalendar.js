const solver = require('javascript-lp-solver');
const optimizer = require('./optimizer.js');
const planModel = require('./plan.js');
const recipesMod = require('./recipes.js');
const fs = require('fs');

async function readCalendar(req) {
	let calendar;
	if (req.session.user && req.cookies.user_sid) {
		let calendarString = (await planModel.retrievePlan(req.app.locals.db, req.session.userid)).plan;
		calendar = JSON.parse(calendarString);
  }
	else {
    	const calendarString = fs.readFileSync('./saved_plans/recipe1.txt').toString('utf-8');
    	calendar = JSON.parse(calendarString);
  }
	return calendar;
}

async function readInputConstraints(req) {
	let inputConstraints;
	if (req.session.user && req.cookies.user_sid) {
		let inputConstraintsString = (await planModel.retrieveConstraints(req.app.locals.db, req.session.userid)).constraints;
		inputConstraints = JSON.parse(inputConstraintsString);
  }
	else {
    	const inputConstraintsString = fs.readFileSync('./saved_plans/constraints.txt').toString('utf-8');
    	inputConstraints = JSON.parse(inputConstraintsString);
  }
	return inputConstraints;
}

async function readRejectedRecipes(req) {
	let rejectedRecipes;
	if (req.session.user && req.cookies.user_sid) {
		let rejectedRecipesString =
			await planModel.retrieveRejectedRecipes(req.app.locals.db, req.session.userid);
		rejectedRecipes = JSON.parse(rejectedRecipesString.rejected_recipes);
	  }
	else {
    	const rejectedRecipesString = fs.readFileSync('./saved_plans/rejectedRecipes.txt').toString('utf-8');
    	rejectedRecipes = JSON.parse(rejectedRecipesString);
  }
	return rejectedRecipes;
}

async function writeCalendar(req, calendar) {
	if (req.session.user && req.cookies.user_sid) {
		planModel.insertPlan(req.app.locals.db, req.session.userid, calendar);
	} else {
		await optimizer.writeCalendarFile('./saved_plans/recipe1.txt', calendar);
	}
}

async function writeRejectedRecipes(req, rejectedRecipes) {
	if (req.session.user && req.cookies.user_sid) {
		planModel.insertRejectedRecipes(req.app.locals.db, req.session.userid, rejectedRecipes);
	} else {
		await optimizer.writeRejectedRecipesFile('./saved_plans/rejectedRecipes.txt', rejectedRecipes);
	}
}

async function deleteRecipeFromCalendar(req, rejectedRecipeId) {
		let calendar = await readCalendar(req);
		let inputConstraints = await readInputConstraints(req);
		let rejectedRecipes = await readRejectedRecipes(req);

    // Add new rejected recipe to list and update database
    if (!rejectedRecipes.includes(rejectedRecipeId)) {
    	rejectedRecipes.push(rejectedRecipeId);
    }


    // Find location of rejected recipe in calendar object
   	var i;
   	var j;
   	var dayIndex;
   	var mealIndex;
   	for(i=0; i<calendar.length; i++){
   		for(j=0; j<calendar[i].meals.length; j++){
   			if (calendar[i].meals[j].recipes[0].id == rejectedRecipeId){
   				dayIndex = i;
   				mealIndex = j;
   			}
   		}
   	}


   	// Get list off all recipes names (not ids) which should be excluded from solver (rejected + other planned days)
   	let usedRecipeNames = [];
   	for(i=0; i<calendar.length; i++){
   		for(j=0; j<calendar[i].meals.length; j++){
   			if (i !== dayIndex) {
   				usedRecipeNames.push(calendar[i].meals[j].recipes[0].name);
   			}
   		}
   	}
   	let singleRecipe;
   	for(i=0; i<rejectedRecipes.length; i++){
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
    variablesKeys = Object.keys(model.variables);
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
    if(results.feasible != true){
    	res.render('error', {
      	message: 'Solution cannot be found without the rejected recipe',
      	error: { status: 'No Solution' },
      	user: req.session.user,
    });
    } else {
    	const meals = optimizer.returnMealsForCalendar(model, results, inputConstraints);
    	calendar[dayIndex].meals = meals;
			writeCalendar(req, calendar);
			writeRejectedRecipes(req, rejectedRecipes);
    }

		return calendar;
}

async function incrementActiveMeal(req, eatenDay, eatenMeal) {
	let calendar = await readCalendar(req);
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
};
