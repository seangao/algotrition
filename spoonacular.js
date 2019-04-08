// Run this script with:
//   node spoonacular.js
// It requires a spoonacular key and a postgresql database in a key.js file:
// module.exports = {
//  database: 'postgres://user:password@address:port/name?ssl=true',
//  spoonacular: 'your-spoonacular-key'
// };


const unirest = require('unirest');
const pgp = require('pg-promise')();
// const fs = require('fs');
const keys = require('./keys');
const config = require('./config');


const db = pgp(config.databaseURL);

const numberOfRecipes = 1;
function getField(name, goodOrBad) {
  const gb = goodOrBad;
  let i = 0;
  while (i < gb.length && gb[i].recipe_name !== name) {
    i += 1;
  }
  if (gb[i]) { return parseFloat(gb[i].amount); }
  return 0;
}

function getNutritionalInfo(recipes) {
  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i];
    unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/nutritionWidget.json`)
      .header('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com')
      .header('X-RapidAPI-Key', keys.spoonacular)
      .end((result) => {
        const nutr = result.body;
        const stmt = `INSERT INTO recipes_sp (
        id,
        total_time_seconds,
        breakfast,
        lunch,
        dinner,
        gluten,
        peanut,
        seafood,
        sesame,
        soy,
        dairy,
        egg,
        sulfite,
        tree_nut,
        wheat,
        vegetarian,
        vegan,
        ketogenic,
        potassium,
        sodium,
        cholesterol,
        trans_fat,
        saturated_fat,
        carbohydrates,
        fiber,
        protein,
        vitamin_c,
        calcium,
        iron,
        sugar,
        energy,
        fat,
        vitamin_a,
        ingredients,
        recipe_name,
        instructions,
        source_recipe_url,
        very_healthy,
        cheap,
        very_popular,
        preparation_minutes,
        cooking_minutes,
        price_per_serving,
        cuisine,
        ready_in_minutes,
        servings,
        image_url
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47)`;
        const values = [
        // id,
          recipe.id,
          // total_time_seconds,
          60 * (recipe.readyInMinutes),
          // breakfast,
          (recipe.dishTypes.includes('breakfast')) ? 1 : 0,
          // lunch,
          (recipe.dishTypes.includes('lunch')) ? 1 : 0,
          // dinner,
          (recipe.dishTypes.includes('dinner')) ? 1 : 0,
          // gluten,
          recipe.glutenFree,
          // peanut,
          false,
          // seafood,
          false,
          // sesame,
          false,
          // soy,
          false,
          // dairy,
          recipe.dairyFree,
          // egg,
          false,
          // sulfite,
          false,
          // tree_nut,
          false,
          // wheat,
          false,
          // vegetarian,
          recipe.vegetarian,
          // vegan,
          recipe.vegan,
          // ketogenic,
          recipe.ketogenic,
          // potassium,
          getField('Potassium', nutr.good),
          // sodium,
          getField('Sodium', nutr.bad),
          // cholesterol,
          getField('Cholesterol', nutr.bad),
          // trans_fat,
          0,
          // saturated_fat,
          getField('Saturated Fat', nutr.bad),
          // carbohydrates,
          getField('Carbohydrates', nutr.bad),
          // fiber,
          getField('Fiber', nutr.good),
          // protein,
          getField('Protein', nutr.good),
          // vitamin_c,
          getField('Vitamin C', nutr.good),
          // calcium,
          getField('Calcium', nutr.good),
          // iron,
          getField('Iron', nutr.good),
          // sugar,
          getField('Sugar', nutr.bad),
          // energy,
          parseFloat(nutr.calories),
          // fat,
          getField('Fat', nutr.bad),
          // vitamin_a,
          getField('Vitamin A', nutr.good),
          // ingredients,
          JSON.stringify(recipe.extendedIngredients),
          // recipe_name,
          recipe.title,
          // instructions,
          recipe.instructions,
          // source_recipe_url,
          recipe.sourceUrl,
          // very_healthy,
          recipe.veryHealthy,
          // cheap,
          recipe.cheap,
          // very_popular,
          recipe.veryPopular,
          // preparation_minutes,
          recipe.preparationMinutes,
          // cooking_minutes,
          recipe.cookingMinutes,
          // price_per_serving,
          recipe.pricePerServing,
          // cuisines,
          JSON.stringify(recipe.cuisines),
          // ready_in_minutes,
          recipe.readyInMinutes,
          // servings,
          recipe.servings,
          // image_url
          recipe.image,
        ];
        console.log(recipe.title);
        db.none(stmt, values);
      });
  }
}

function getRandomRecipe() {
  unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=${numberOfRecipes}`)
    .header('X-RapidAPI-Key', keys.spoonacular)
    .end((result) => {
    // console.log(result.body.recipes);
      getNutritionalInfo(result.body.recipes);
    });
}

getRandomRecipe();
