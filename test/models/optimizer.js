const { expect } = require('chai');

const app = require('../../app');

const { db } = app.locals;
const optimizer = require('../../models/optimizer');
const recipesMod = require('../../models/recipes');

describe('models/optimizer', () => {
  it('fitsConstraints', async () => {
    	console.log('running');
    	const inputConstraints = {
      'calories-min': '1500',
		  'calories-max': '2500',
		  meals: '4',
		  days: '3',
		  'protein-min': '50',
		  'protein-max': '100',
		  'fat-min': '20',
		  'fat-max': '100',
		  'optimize-id': '0',
		  generate: '',
    };

    const recipes = await recipesMod.getAllRecipes(db);
    const calendar = optimizer.optimization(inputConstraints, recipes);

    let satisfied = true;

    let i;
    let j;
    let recipe;
    for (i = 0; i < calendar.length; i++) {
      let totalCalories = 0;
      let totalProtein = 0;
      let totalFat = 0;
      for (j = 0; j < calendar[i].meals.length; j++) {
        recipe = await recipesMod.getSpoonRecipeById(db, calendar[i].meals[j].recipes[0].id);
        totalProtein += recipe.protein * calendar[i].meals[j].recipes[0].servings;
        totalCalories += recipe.energy * calendar[i].meals[j].recipes[0].servings;
        totalFat += recipe.fat * calendar[i].meals[j].recipes[0].servings;
      }

      if (totalProtein < inputConstraints['protein-min'] || totalProtein > inputConstraints['protein-max']) {
        satisfied = false;
      }
      if (totalFat < inputConstraints['fat-min'] || totalFat > inputConstraints['fat-max']) {
        satisfied = false;
      }
      if (totalCalories < inputConstraints['calories-min'] || totalCalories > inputConstraints['calories-max']) {
        satisfied = false;
      }
    }

    // expect(optimizerModel.populateConstraints().to.equal());
    expect(satisfied).to.be.true;
  }).timeout(10000);


  it('optimizedCriteria', async () => {
    	console.log('running');
    	const inputConstraints = {
      'calories-min': '1500',
		  'calories-max': '2500',
		  meals: '4',
		  days: '3',
		  'protein-min': '50',
		  'protein-max': '100',
		  'fat-min': '20',
		  'fat-max': '100',
		  'optimize-id': '0',
		  generate: '',
    };

    const recipes = await recipesMod.getAllRecipes(db);
    const calendar = optimizer.optimization(inputConstraints, recipes);

    let satisfied = true;

    let i;
    let j;
    let recipe;
    const totalTimeArray = [];
    for (i = 0; i < calendar.length; i++) {
      let totalTime = 0;
      for (j = 0; j < calendar[i].meals.length; j++) {
        recipe = await recipesMod.getSpoonRecipeById(db, calendar[i].meals[j].recipes[0].id);
        totalTime += recipe.total_time_seconds;
      }
      totalTimeArray.push(totalTime);
    }


    for (i = 1; i < totalTimeArray.length; i++) {
      if (totalTimeArray[i] < totalTimeArray[i - 1]) {
        satisfied = false;
      }
    }

    expect(satisfied).to.be.true;
  }).timeout(10000);
});
