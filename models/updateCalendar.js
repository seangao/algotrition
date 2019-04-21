const solver = require('javascript-lp-solver');
const optimizer = require('./optimizer.js');
const planModel = require('./plan.js');
const recipesMod = require('./recipes.js');
const fs = require('fs');


async function updateCalendar(req, rejectedRecipeId) {	

	let calendar;
	let rejectedRecipes;
	let inputConstraints;
	

	// Read in current calendar, input constraints, and previously-rejected recipes
	if (req.session.user && req.cookies.user_sid) {
		let calendarString = (await planModel.retrievePlan(req.app.locals.db, req.session.userid)).plan;
		calendar = JSON.parse(calendarString);
		let inputConstraintsString = (await planModel.retrieveConstraints(req.app.locals.db, req.session.userid)).constraints;
		inputConstraints = JSON.parse(inputConstraintsString);
		rejectedRecipes = await planModel.retrieveRejectedRecipes(req.app.locals.db, req.session.userid);
		rejectedRecipes = JSON.parse(rejectedRecipes.rejected_recipes);
    } else {
    	const calendarString = fs.readFileSync('./saved_plans/recipe1.txt').toString('utf-8');
    	calendar = JSON.parse(calendarString);
    	const inputConstraintsString = fs.readFileSync('./saved_plans/constraints.txt').toString('utf-8');
    	inputConstraints = JSON.parse(inputConstraintsString);
    	const rejectedRecipesString = fs.readFileSync('./saved_plans/rejectedRecipes.txt').toString('utf-8');
    	rejectedRecipes = JSON.parse(rejectedRecipesString);     
    }

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
   				console.log(calendar[i].meals[j].recipes[0].id);
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
    console.log(results);

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

    	if (req.session.user && req.cookies.user_sid) {
	    	planModel.insertRejectedRecipes(req.app.locals.db, req.session.userid, rejectedRecipes);
	    	planModel.insertPlan(req.app.locals.db, req.session.userid, calendar);
	    } else {
	    	await optimizer.writeRejectedRecipesFile('./saved_plans/rejectedRecipes.txt', rejectedRecipes);
	    	await optimizer.writeCalendarFile('./saved_plans/recipe1.txt', calendar);
	    }
    }
    
}


module.exports = {
  updateCalendar,
};

