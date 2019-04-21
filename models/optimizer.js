const solver = require('javascript-lp-solver');
const fs = require('fs');
const planModel = require('../models/plan');
// const recipesModels = require('../models/recipes');


// This function creates the constraints object within the solver object
function populateConstraints(inputConstraints) {
  const output = {};

  var i;
  for (i=0; i<inputConstraints.numBreakfasts; i++) {
    output["breakfast" + String(2*i+1)] = { min: 0.9 };
    output["breakfast" + String(2*i+2)] = { max: 1.1 };
  }

  for (i=0; i<inputConstraints.numLunches; i++) {
    output["lunch" + String(2*i+1)] = { min: 0.9 };
    output["lunch" + String(2*i+2)] = { max: 1.1 };
  }

  for (i=0; i<inputConstraints.numDinners; i++) {
    output["dinner" + String(2*i+1)] = { min: 0.9 };
    output["dinner" + String(2*i+2)] = { max: 1.1 };
  }


  if ('calories-min' in inputConstraints && inputConstraints.optParameter !== 'energy') {
    output.energy = { min: inputConstraints['calories-min'] };
  }

  if ('calories-max' in inputConstraints && inputConstraints.optParameter !== 'energy') {
    output.energy2 = { max: inputConstraints['calories-max'] };
  }

  if ('potassium-min' in inputConstraints) {
    output.potassium = { min: inputConstraints['potassium-min'] };
  }

  if ('potassium-max' in inputConstraints) {
    output.potassium2 = { max: inputConstraints['potassium-max'] };
  }

  if ('sodium-min' in inputConstraints) {
    output.sodium = { min: inputConstraints['sodium-min'] };
  }

  if ('sodium-max' in inputConstraints) {
    output.sodium2 = { max: inputConstraints['sodium-max'] };
  }

  if ('calcium-min' in inputConstraints) {
    output.calcium = { min: inputConstraints['calcium-min'] };
  }

  if ('calcium-max' in inputConstraints) {
    output.calcium2 = { max: inputConstraints['calcium-max'] };
  }

  if ('iron-min' in inputConstraints) {
    output.iron = { min: inputConstraints['iron-min'] };
  }

  if ('iron-max' in inputConstraints) {
    output.iron2 = { max: inputConstraints['iron-max'] };
  }

  if ('satfat-min' in inputConstraints) {
    output.saturated_fat = { min: inputConstraints['satfat-min'] };
  }

  if ('satfat-max' in inputConstraints) {
    output.saturated_fat2 = { max: inputConstraints['satfat-max'] };
  }

  if ('transfat-min' in inputConstraints) {
    output.trans_fat = { min: inputConstraints['transfat-min'] };
  }

  if ('transfat-max' in inputConstraints) {
    output.trans_fat2 = { max: inputConstraints['transfat-max'] };
  }

  if ('sugar-min' in inputConstraints) {
    output.sugar = { min: inputConstraints['sugar-min'] };
  }

  if ('sugar-max' in inputConstraints) {
    output.sugar2 = { max: inputConstraints['sugar-max'] };
  }

  if ('carbs-min' in inputConstraints) {
    output.carbohydrates = { min: inputConstraints['carbs-min'] };
  }

  if ('carbs-max' in inputConstraints) {
    output.carbohydrates2 = { max: inputConstraints['carbs-max'] };
  }

  if ('fiber-min' in inputConstraints) {
    output.fiber = { min: inputConstraints['fiber-min'] };
  }

  if ('fiber-max' in inputConstraints) {
    output.fiber2 = { max: inputConstraints['fiber-max'] };
  }

  if ('protein-min' in inputConstraints) {
    output.protein = { min: inputConstraints['protein-min'] };
  }

  if ('protein-max' in inputConstraints) {
    output.protein2 = { max: inputConstraints['protein-max'] };
  }

  if ('vita-min' in inputConstraints) {
    output.vitamin_a = { min: inputConstraints['vita-min'] };
  }

  if ('vita-max' in inputConstraints) {
    output.vitamin_a2 = { max: inputConstraints['vita-max'] };
  }

  if ('vitc-min' in inputConstraints) {
    output.vitamin_c = { min: inputConstraints['vitc-min'] };
  }

  if ('vitc-max' in inputConstraints) {
    output.vitamin_c2 = { max: inputConstraints['vitc-max'] };
  }

  if ('fat-min' in inputConstraints) {
    output.fat = { min: inputConstraints['fat-min'] };
  }

  if ('fat-max' in inputConstraints) {
    output.fat2 = { max: inputConstraints['fat-max'] };
  }


  return output;
}


function duplicateVariables(variables, servingsArray, inputConstraints) {
  const partialScaledParameters = [
    'potassium',
    'sodium',
    'cholesterol',
    'trans_fat',
    'saturated_fat',
    'carbohydrates',
    'fiber',
    'protein',
    'vitamin_c',
    'calcium',
    'iron',
    'sugar',
    'energy',
    'fat',
    'vitamin_a',
    'price_per_serving'];


  let i;
  const scaledParameters = [];
  for (i = 0; i < partialScaledParameters.length; i += 1) {
    scaledParameters.push(partialScaledParameters[i]);
    scaledParameters.push(`${partialScaledParameters[i]}2`);
  }


  const variables2 = {};

  let j;
  const k = Object.keys(variables);

  for (i = 0; i < k.length; i += 1) {
    for (j = 0; j < servingsArray.length; j += 1) {
      const tempObj = {};
      const recipe = variables[k[i]];
      const recipeFields = Object.keys(recipe);

      // Reject suggestions which take up too large or small a portion of the calories for even distribution across meals
      // Later the fraction of total calories should be dependent on the number of meals
      let avgCaloriesPerMeel = inputConstraints['calories-min'] / (inputConstraints.numBreakfasts + inputConstraints.numLunches + inputConstraints.numDinners);
      if (inputConstraints.optParameter !== 'energy') {
        if (recipe.energy * servingsArray[j] < 0.5*avgCaloriesPerMeel || recipe.energy * servingsArray[j] > 1.5*avgCaloriesPerMeel) {
          continue;
        }
      }


      let m;
      for (m = 0; m < recipeFields.length; m += 1) {
        if (scaledParameters.includes(recipeFields[m])) {
          tempObj[recipeFields[m]] = recipe[recipeFields[m]] * servingsArray[j];
        } else {
          tempObj[recipeFields[m]] = recipe[recipeFields[m]];
        }
      }

      tempObj.num_recommended_servings = servingsArray[j];
      tempObj.recipe_name = recipe.recipe_name;
      variables2[`${k[i]}_${String(servingsArray[j])}`] = tempObj;
    }
  }


  return variables2;
}


// Updates a single field in tempObj with data from the recipe that corresponds to the constraint
function singleConstraint(constraintName, recipe, tempObj) {
  if (constraintName in recipe) {
    if (recipe[constraintName] !== 'NaN') {
      tempObj[constraintName] = recipe[constraintName];
      return true;
    }
  } else if (constraintName.substr(0, constraintName.length - 1) in recipe) {
    if (recipe[constraintName.substr(0, constraintName.length - 1)] !== 'NaN') {
      tempObj[constraintName] = recipe[constraintName.substr(0, constraintName.length - 1)];
      return true;
    }
  }
  return false;
}

// Creates the variables object within the solver object
function populateRecipeVariables(constraints, inputConstraints, recipeArray) {
  const variables = {};
  let numBreakfastRecipes = 0;
  let numLunchRecipes = 0;
  let numDinnerRecipes = 0;
  let i;

  for (i = 0; i < recipeArray.length; i += 1) {
    const recipe = recipeArray[i];

    if (recipe.breakfast === 0 && recipe.lunch === 0 && recipe.dinner === 0) {
      continue;
    }

    const tempObj = {};
    const constraintList = Object.keys(constraints);
    // loop over constraint list calling singleConstraint
    let allConstraintsAvailable = true;
    let j;
    for (j = 0; j < constraintList.length; j += 1) {
      // singleConstraint(constraintList[j],recipe,tempObj)
      if (!singleConstraint(constraintList[j], recipe, tempObj)) {
        allConstraintsAvailable = false;
      }
    }

    // Set all breakfast, lunch, dinner values to zero in tempObj
    let k;
    for (k=0; k<inputConstraints.numBreakfasts; k++) {
      tempObj["breakfast" + String(2*k+1)] = 0;
      tempObj["breakfast" + String(2*k+2)] = 0;
    }

    for (k=0; k<inputConstraints.numLunches; k++) {
      tempObj["lunch" + String(2*k+1)] = 0;
      tempObj["lunch" + String(2*k+2)] = 0;
    }

    for (k=0; k<inputConstraints.numDinners; k++) {
      tempObj["dinner" + String(2*k+1)] = 0;
      tempObj["dinner" + String(2*k+2)] = 0;
    }

    // Choosing breakfast, lunch or dinner for recipes matching multiple courses
    if (recipe.breakfast === 1) {
      recipe.lunch = 0;
      recipe.dinner = 0;
    }
    if (recipe.lunch === 1 && recipe.dinner === 1) {
      if (Math.random() < 0.5) {
        recipe.lunch = 1;
        recipe.dinner = 0;
      } else {
        recipe.lunch = 0;
        recipe.dinner = 1;
        }
    }

    // Increment counter for appropriate course and set values for one meal to 1 in tempObj
    if (recipe.breakfast === 1) {
      tempObj["breakfast" + String(2*(numBreakfastRecipes%inputConstraints.numBreakfasts) + 1)] = 1;
      tempObj["breakfast" + String(2*(numBreakfastRecipes%inputConstraints.numBreakfasts) + 2)] = 1;
      numBreakfastRecipes = numBreakfastRecipes + 1;
    }
    if (recipe.lunch === 1) {
      tempObj["lunch" + String(2*(numLunchRecipes%inputConstraints.numLunches) + 1)] = 1;
      tempObj["lunch" + String(2*(numLunchRecipes%inputConstraints.numLunches) + 2)] = 1;
      numLunchRecipes = numLunchRecipes + 1;
    }
    if (recipe.dinner === 1) {
      tempObj["dinner" + String(2*(numDinnerRecipes%inputConstraints.numDinners) + 1)] = 1;
      tempObj["dinner" + String(2*(numDinnerRecipes%inputConstraints.numDinners) + 2)] = 1;
      numDinnerRecipes = numDinnerRecipes + 1;
    }

    tempObj.id = recipe.id;
    tempObj.total_time_seconds = recipe.total_time_seconds;
    tempObj.price_per_serving = recipe.price_per_serving;
    tempObj.ingredients = recipe.ingredients;
    tempObj.recipe_name = recipe.recipe_name;
    tempObj.source_recipe_url = recipe.source_recipe_url;
    tempObj.image_url = recipe.image_url;
    if (inputConstraints.optParameter === 'energy') {
      tempObj.energy = recipe.energy;
    }


    let restrictionFriendly = true;
    if ('allergens' in inputConstraints) {
      const { allergens } = inputConstraints;

      for (j = 0; j < allergens.length; j += 1) {
        if (allergens[j] === 'tree nuts') {
          allergens[j] = 'tree_nut';
        }
      }


      if (typeof (allergens) === 'string') {
        if (recipe[allergens] === false) {
          restrictionFriendly = false;
        }
      } else {
        for (j = 0; j < allergens.length; j += 1) {
          if (recipe[allergens[j]] === false) {
            restrictionFriendly = false;
          }
        }
      }
    }

    if ('diet' in inputConstraints) {
      if (recipe[inputConstraints.diet] === false) {
        restrictionFriendly = false;
      }
    }


    if (allConstraintsAvailable && restrictionFriendly) {
      variables[recipe.id] = tempObj;
    }
  }

  return variables;
}


// Creates ints object within the solver object
function populateInts(variables) {
  const ints = {};
  const k = Object.keys(variables);
  let i;
  for (i = 0; i < k.length; i += 1) {
    ints[k[i]] = 1;
  }

  return ints;
}

function returnMealsForCalendar(model, results, inputConstraints) {
  const keys = Object.keys(results);
  let i;

  const meals = [];

  for (i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'feasible' && keys[i] !== 'result' && keys[i] !== 'bounded' && results[keys[i]] > 0) {
      const recipe = model.variables[keys[i]];
      const ingredientsArray = JSON.parse(recipe.ingredients);


      const singleRecipe = {
        id: recipe.id,
        name: recipe.recipe_name,
        servings: recipe.num_recommended_servings,
        link: recipe.source_recipe_url,
        ingredients: ingredientsArray,
        calories: recipe.energy,
        total_time_seconds: recipe.total_time_seconds,
        image: recipe.image_url,
      };


      let j;
      for(j=0; j < inputConstraints.numBreakfasts; j++){
        if(recipe["breakfast" + String(2*j + 1)] === 1){
          const meal = { name: 'Breakfast ' + String(j+1), id: (j+1), recipes: [singleRecipe] };
          meals[meal.id - 1] = meal;
        }
      }

      for(j=0; j < inputConstraints.numLunches; j++){
        if(recipe["lunch" + String(2*j + 1)] === 1){
          const meal = { name: 'Lunch ' + String(j+1), id: (inputConstraints.numBreakfasts + j + 1), recipes: [singleRecipe] };
          meals[meal.id - 1] = meal;
        }
      }

      for(j=0; j < inputConstraints.numDinners; j++){
        if(recipe["dinner" + String(2*j + 1)] === 1){
          const meal = { name: 'Dinner ' + String(j+1), id: (inputConstraints.numBreakfasts + inputConstraints.numLunches + j + 1), recipes: [singleRecipe] };
          meals[meal.id - 1] = meal;
        }
      }

    }
  } 

  return meals;
}

function returnCalendar(resultsArray, mealsArray) {
  const week = [];
  let counter = 1;
  let i;
  for (i = 0; i < resultsArray.length; i += 1) {
    if (resultsArray[i].feasible === true) {
      week.push({ name: `Day ${counter}`, id: counter, meals: mealsArray[i] });
      counter += 1;
    }
  }

  // Initiate the first meal of the first day as the active one
  if (week.length > 0) {
    week[0].meals[0].active = true;
  }

  return week;
}

function writeCalendarFile(path, calendar) {
  fs.writeFile(path, JSON.stringify(calendar), (err) => {
    if (err) throw err;
  });
}

function writeConstraintsFile(path, constraints) {
  fs.writeFile(path, JSON.stringify(constraints), (err) => {
    if (err) throw err;
  });
}

function writeRejectedRecipesFile(path, recipes) {
  fs.writeFile(path, JSON.stringify(recipes), (err) => {
    if (err) throw err;
  });
}

function getNumberEachCourse(inputConstraints){
  if (inputConstraints.meals == 1){
    inputConstraints.numBreakfasts = 0;
    inputConstraints.numLunches = 0;
    inputConstraints.numDinners = 1;
  }
  if (inputConstraints.meals == 2){
    inputConstraints.numBreakfasts = 0;
    inputConstraints.numLunches = 1;
    inputConstraints.numDinners = 1;
  }
  if (inputConstraints.meals == 3){
    inputConstraints.numBreakfasts = 1;
    inputConstraints.numLunches = 1;
    inputConstraints.numDinners = 1;
  }
  if (inputConstraints.meals == 4){
    inputConstraints.numBreakfasts = 1;
    inputConstraints.numLunches = 2;
    inputConstraints.numDinners = 1;
  }
  if (inputConstraints.meals == 5){
    inputConstraints.numBreakfasts = 1;
    inputConstraints.numLunches = 2;
    inputConstraints.numDinners = 2;
  }
  if (inputConstraints.meals == 6){
    inputConstraints.numBreakfasts = 1;
    inputConstraints.numLunches = 3;
    inputConstraints.numDinners = 2;
  }

  return inputConstraints;
}


async function incrementActiveMeal(db, id, calendar, eatenDay, eatenMeal) {
  calendar[eatenDay].meals[eatenMeal].eaten = true;
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
  fs.writeFile(path, JSON.stringify(calendar), (err) => {
    if (err) throw err;
  });
  return calendar;
}

// This is the primary function which is reads in user input and returns a meal plan
function optimization(inputConstraints, recipes) {
  const resultsArray = [];
  const usedRecipeNames = [];
  const mealsArray = [];
  let variablesKeys;
  let resultsKeys;
  let i;
  let j;

  inputConstraints = getNumberEachCourse(inputConstraints);


  if (inputConstraints["optimize-id"] == 0) {
    inputConstraints.optParameter = 'total_time_seconds';
    inputConstraints.optType = 'min';
  }
  if (inputConstraints["optimize-id"] == 1) {
    inputConstraints.optParameter = 'price_per_serving';
    inputConstraints.optType = 'min';
  }
  if (inputConstraints["optimize-id"] == 2) {
    inputConstraints.optParameter = 'energy';
    inputConstraints.optType = 'min';
  }
  if (inputConstraints["optimize-id"] == 3) {
    inputConstraints.optParameter = 'energy';
    inputConstraints.optParameterType = 'max';
  } 


  for (i = 0; i < inputConstraints.days; i += 1) {
    const model = {
      optimize: inputConstraints.optParameter,
      opType: inputConstraints.optParameterType,
    };

    model.constraints = populateConstraints(inputConstraints);
    model.variables = populateRecipeVariables(model.constraints, inputConstraints, recipes);
    variablesKeys = Object.keys(model.variables);
    for (j = 0; j < variablesKeys.length; j += 1) {
      if (usedRecipeNames.includes(model.variables[variablesKeys[j]].recipe_name)) {
        delete model.variables[variablesKeys[j]];
      }
    }

    const servingNumbers = [0.5, 1, 1.5, 2, 3];
    model.variables = duplicateVariables(model.variables, servingNumbers, inputConstraints);
    model.ints = populateInts(model.variables);


    const results = solver.Solve(model);
    console.log(results);
    resultsArray.push(results);
    mealsArray.push(returnMealsForCalendar(model, results,inputConstraints));

    resultsKeys = Object.keys(results);
    for (j = 0; j < resultsKeys.length; j += 1) {
      if (resultsKeys[j] !== 'feasible' && resultsKeys[j] !== 'result' && resultsKeys[j] !== 'bounded' && results[resultsKeys[j]] > 0) {
        usedRecipeNames.push(model.variables[resultsKeys[j]].recipe_name);
      }
    }
  }


  const calendar = returnCalendar(resultsArray, mealsArray);

  return calendar;
}


module.exports = {
  optimization, returnCalendar, writeCalendarFile, writeConstraintsFile, writeRejectedRecipesFile, incrementActiveMeal, 
  populateConstraints, populateRecipeVariables, duplicateVariables, populateInts, returnMealsForCalendar, 
};
