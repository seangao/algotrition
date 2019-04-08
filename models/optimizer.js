const solver = require('javascript-lp-solver');
const fs = require('fs');
// const recipesModels = require('../models/recipes');


// This function creates the constraints object within the solver object
function populateConstraints(inputConstraints) {
  const output = {};

  output.breakfast = { min: 0.9 };
  output.breakfast2 = { max: 1.1 };
  output.lunch = { min: 0.9 };
  output.lunch2 = { max: 1.1 };
  output.dinner = { min: 0.9 };
  output.dinner2 = { max: 1.1 };


  if ('calories-min' in inputConstraints) {
    output.energy = { min: inputConstraints['calories-min'] };
  }

  if ('calories-max' in inputConstraints) {
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


function duplicateVariables(variables, servingsArray) {
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
    'vitamin_a'];


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

  let i;
  for (i = 0; i < recipeArray.length; i += 1) {
    const recipe = recipeArray[i];

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

    //Chosing breakfast, lunch or dinner
    if (1 == recipe.breakfast) {
      recipe.lunch = 0;
      recipe.dinner = 0;
    }
    if (1 == recipe.lunch) {
      if (Math.random() < 0.5) {
        recipe.lunch = 1;
        recipe.dinner = 0;
      }
      else {
        recipe.lunch = 0;
        recipe.dinner = 1;
      }
    }

    tempObj.breakfast = recipe.breakfast;
    tempObj.breakfast2 = recipe.breakfast;
    tempObj.lunch = recipe.lunch;
    tempObj.lunch2 = recipe.lunch;
    tempObj.dinner = recipe.dinner;
    tempObj.dinner2 = recipe.dinner;
    tempObj.total_time_seconds = recipe.total_time_seconds;
    tempObj.ingredients = recipe.ingredients;
    tempObj.recipe_name = recipe.recipe_name;
    tempObj.source_recipe_url = recipe.source_recipe_url;


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


function returnCalendar(model, results) {
  const keys = Object.keys(results);
  let i;

  const meals = [];

  for (i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'feasible' && keys[i] !== 'result' && keys[i] !== 'bounded' && results[keys[i]] > 0) {
      const recipe = model.variables[keys[i]];
      const ingredientsArray = JSON.parse(recipe.ingredients);


      const singleRecipe = {
        id: 1,
        name: recipe.recipe_name,
        servings: recipe.num_recommended_servings,
        link: recipe.source_recipe_url,
        ingredients: ingredientsArray,
        calories: recipe.energy,
        total_time_seconds: recipe.total_time_seconds,
      };

      if (recipe.breakfast === 1) {
        const meal = { name: 'Breakfast', id: 1, recipes: [singleRecipe] };
        meals[0] = meal;
      }
      if (recipe.lunch === 1) {
        const meal = { name: 'Lunch', id: 2, recipes: [singleRecipe] };
        meals[1] = meal;
      }
      if (recipe.dinner === 1) {
        const meal = { name: 'Dinner', id: 3, recipes: [singleRecipe] };
        meals[2] = meal;
      }
    }
  }

  const week = [{ name: 'Day 1', id: 1, meals }];

  // Initiate the first meal of the first day as the active one
  week[0].meals[0].active = true;

  return week;
}

function writeCalendarFile(path, calendar) {
  fs.writeFile(path, JSON.stringify(calendar), (err) => {
    if (err) throw err;
  });
}


function incrementActiveMeal(path, calendar, eatenDay, eatenMeal) {
  calendar[eatenDay].meals[eatenMeal].eaten = true;
  eatenMeal += 1;
  if (eatenMeal in calendar[eatenDay].meals) {
    calendar[eatenDay].meals[eatenMeal].active = true;
  } else {
    eatenDay += 1;
    if (eatenDay in calendar) {
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


  const model = {
    optimize: 'total_time_seconds',
    opType: 'min',
  };

  model.constraints = populateConstraints(inputConstraints);
  model.variables = populateRecipeVariables(model.constraints, inputConstraints, recipes);

  const servingNumbers = [0.5, 1, 1.5, 2, 3];
  model.variables = duplicateVariables(model.variables, servingNumbers);
  model.ints = populateInts(model.variables);

  const results = solver.Solve(model);

  return [model, results];
}


module.exports = {
  optimization, returnCalendar, writeCalendarFile, incrementActiveMeal,
};
