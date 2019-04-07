const solver = require('javascript-lp-solver');
const recipesModels = require('../models/recipes');


// This is the primary function which is reads in user input and returns a meal plan
function optimization(input_constraints, recipes) {
  // console.log(input_constraints);


  const model = {
    optimize: 'total_time_seconds',
    opType: 'min',
  };

  model.constraints = populate_constraints(input_constraints);
  model.variables = populate_recipe_variables(model.constraints, input_constraints, recipes);

  const serving_numbers = [0.5, 1, 1.5, 2, 3];
  model.variables = duplicate_variables(model.variables, serving_numbers);
  model.ints = populate_ints(model.variables);

  const results = solver.Solve(model);

  return [model, results];
}


// This function creates the constraints object within the solver object
function populate_constraints(input_constraints) {
  const output = {};

  output.breakfast = { min: 0.9 };
  output.breakfast2 = { max: 1.1 };
  output.lunch = { min: 0.9 };
  output.lunch2 = { max: 1.1 };
  output.dinner = { min: 0.9 };
  output.dinner2 = { max: 1.1 };


  if ('calories-min' in input_constraints) {
    output.energy = { min: input_constraints['calories-min'] };
  }

  if ('calories-max' in input_constraints) {
    output.energy2 = { max: input_constraints['calories-max'] };
  }

  if ('potassium-min' in input_constraints) {
    output.potassium = { min: input_constraints['potassium-min'] };
  }

  if ('potassium-max' in input_constraints) {
    output.potassium2 = { max: input_constraints['potassium-max'] };
  }

  if ('sodium-min' in input_constraints) {
    output.sodium = { min: input_constraints['sodium-min'] };
  }

  if ('sodium-max' in input_constraints) {
    output.sodium2 = { max: input_constraints['sodium-max'] };
  }

  if ('calcium-min' in input_constraints) {
    output.calcium = { min: input_constraints['calcium-min'] };
  }

  if ('calcium-max' in input_constraints) {
    output.calcium2 = { max: input_constraints['calcium-max'] };
  }

  if ('iron-min' in input_constraints) {
    output.iron = { min: input_constraints['iron-min'] };
  }

  if ('iron-max' in input_constraints) {
    output.iron2 = { max: input_constraints['iron-max'] };
  }

  if ('satfat-min' in input_constraints) {
    output.saturated_fat = { min: input_constraints['satfat-min'] };
  }

  if ('satfat-max' in input_constraints) {
    output.saturated_fat2 = { max: input_constraints['satfat-max'] };
  }

  if ('transfat-min' in input_constraints) {
    output.trans_fat = { min: input_constraints['transfat-min'] };
  }

  if ('transfat-max' in input_constraints) {
    output.trans_fat2 = { max: input_constraints['transfat-max'] };
  }

  if ('sugar-min' in input_constraints) {
    output.sugar = { min: input_constraints['sugar-min'] };
  }

  if ('sugar-max' in input_constraints) {
    output.sugar2 = { max: input_constraints['sugar-max'] };
  }

  if ('carbs-min' in input_constraints) {
    output.carbohydrates = { min: input_constraints['carbs-min'] };
  }

  if ('carbs-max' in input_constraints) {
    output.carbohydrates2 = { max: input_constraints['carbs-max'] };
  }

  if ('fiber-min' in input_constraints) {
    output.fiber = { min: input_constraints['fiber-min'] };
  }

  if ('fiber-max' in input_constraints) {
    output.fiber2 = { max: input_constraints['fiber-max'] };
  }

  if ('protein-min' in input_constraints) {
    output.protein = { min: input_constraints['protein-min'] };
  }

  if ('protein-max' in input_constraints) {
    output.protein2 = { max: input_constraints['protein-max'] };
  }

  if ('vita-min' in input_constraints) {
    output.vitamin_a = { min: input_constraints['vita-min'] };
  }

  if ('vita-max' in input_constraints) {
    output.vitamin_a2 = { max: input_constraints['vita-max'] };
  }

  if ('vitc-min' in input_constraints) {
    output.vitamin_c = { min: input_constraints['vitc-min'] };
  }

  if ('vitc-max' in input_constraints) {
    output.vitamin_c2 = { max: input_constraints['vitc-max'] };
  }

  if ('fat-min' in input_constraints) {
    output.fat = { min: input_constraints['fat-min'] };
  }

  if ('fat-max' in input_constraints) {
    output.fat2 = { max: input_constraints['fat-max'] };
  }

  return output;
}

// Creates the variables object within the solver object
function populate_recipe_variables(constraints, input_constraints, recipe_array) {
  const variables = {};

  let i;
  for (i = 0; i < recipe_array.length; i++) {
    const recipe = recipe_array[i];

    const tempObj = {};
    const constraint_list = Object.keys(constraints);
    // loop over constraint list calling single_constraint
    let all_constraints_available = true;
    var j;
    for (j = 0; j < constraint_list.length; j++) {
      // single_constraint(constraint_list[j],recipe,tempObj)
      if (!single_constraint(constraint_list[j], recipe, tempObj)) {
        all_constraints_available = false;
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


    let restriction_friendly = true;
    if ('allergens' in input_constraints) {
      const { allergens } = input_constraints;
      var j;


      for (j = 0; j < allergens.length; j++) {
        if (allergens[j] == 'tree nuts') {
          allergens[j] = 'tree_nut';
        }
      }


      if (typeof (allergens) === 'string') {
        if (recipe[allergens] == false) {
          restriction_friendly = false;
        }
      } else {
        for (j = 0; j < allergens.length; j++) {
          if (recipe[allergens[j]] == false) {
            restriction_friendly = false;
          }
        }
      }
    }

    if ('diet' in input_constraints) {
      if (recipe[input_constraints.diet] == false) {
        restriction_friendly = false;
      }
    }


    if (all_constraints_available && restriction_friendly) {
      variables[recipe.id] = tempObj;
    }
  }

  return variables;
}


function duplicate_variables(variables, servings_array) {
  const partial_scaled_parameters = [
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
  const scaled_parameters = [];
  for (i = 0; i < partial_scaled_parameters.length; i++) {
    scaled_parameters.push(partial_scaled_parameters[i]);
    scaled_parameters.push(`${partial_scaled_parameters[i]}2`);
  }


  const variables2 = {};

  let j;
  let k;
  k = Object.keys(variables);

  for (i = 0; i < k.length; i++) {
    for (j = 0; j < servings_array.length; j++) {
      const tempObj = {};
      const recipe = variables[k[i]];
      const recipe_fields = Object.keys(recipe);

      var m;
      for (m = 0; m < recipe_fields.length; m++) {
        if (scaled_parameters.includes(recipe_fields[m])) {
          tempObj[recipe_fields[m]] = recipe[recipe_fields[m]] * servings_array[j];
        } else {
          tempObj[recipe_fields[m]] = recipe[recipe_fields[m]];
        }
      }

      tempObj.num_recommended_servings = servings_array[j];
      tempObj.recipe_name = recipe.recipe_name;
      variables2[`${k[i]}_${String(servings_array[j])}`] = tempObj;
    }
  }


  return variables2;
}


// Updates a single field in tempObj with data from the recipe that corresponds to the constraint
function single_constraint(constraint_name, recipe, tempObj) {
  if (constraint_name in recipe) {
    if (recipe[constraint_name] != 'NaN') {
      tempObj[constraint_name] = recipe[constraint_name];
      return true;
    }
  } else if (constraint_name.substr(0, constraint_name.length - 1) in recipe) {
    if (recipe[constraint_name.substr(0, constraint_name.length - 1)] != 'NaN') {
      tempObj[constraint_name] = recipe[constraint_name.substr(0, constraint_name.length - 1)];
      return true;
    }
  } else {
    return false;
  }
}

// Creates ints object within the solver object
function populate_ints(variables) {
  const ints = {};
  const k = Object.keys(variables);
  let i;
  for (i = 0; i < k.length; i++) {
    ints[k[i]] = 1;
  }

  return ints;
}


function return_calendar(model, results) {
  const keys = Object.keys(results);
  let i;

  const meals = [];

  for (i = 0; i < keys.length; i++) {
    if (keys[i] != 'feasible' && keys[i] != 'result' && keys[i] != 'bounded' && results[keys[i]] > 0) {
      const ingredients_array = JSON.parse(model.variables[keys[i]].ingredients);


      const single_recipe = {
        id: 1,
        name: model.variables[keys[i]].recipe_name,
        servings: model.variables[keys[i]].num_recommended_servings,
        link: model.variables[keys[i]].source_recipe_url,
        ingredients: ingredients_array,
      };

      if (model.variables[keys[i]].breakfast == 1) {
        var meal = { name: 'Breakfast', id: 1, recipes: [single_recipe] };
        meals[0] = meal;
      }
      if (model.variables[keys[i]].lunch == 1) {
        var meal = { name: 'Lunch', id: 2, recipes: [single_recipe] };
        meals[1] = meal;
      }
      if (model.variables[keys[i]].dinner == 1) {
        var meal = { name: 'Dinner', id: 3, recipes: [single_recipe] };
        meals[2] = meal;
      }
    }
  }

  const week = [{ name: 'Day 1', id: 1, meals }];

  // Initiate the first meal of the first day as the active one
  week[0].meals[0].active = true;

  return week;
}

function write_calendar_file(path, calendar) {
  const fs = require('fs');
  fs.writeFile(path, JSON.stringify(calendar), (err) => {
    if (err) throw err;
  });
}


function increment_active_meal(path, calendar, eaten_day, eaten_meal) {
  const fs = require('fs');
  calendar[eaten_day].meals[eaten_meal].eaten = true;
  if (calendar[eaten_day].meals[++eaten_meal]) {
    calendar[eaten_day].meals[eaten_meal].active = true;
  } else if (calendar[++eaten_day]) {
    calendar[eaten_day].meals[0].active = true;
  }
  fs.writeFile(path, JSON.stringify(calendar), (err) => {
    if (err) throw err;
  });
  return calendar;
}


module.exports = {
  optimization, return_calendar, write_calendar_file, increment_active_meal,
};
