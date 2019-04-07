// Run this script with:
//   node spoonacular.js
// It requires a spoonacular key and a postgresql database in a key.js file:
// module.exports = {
//  database: 'postgres://user:password@address:port/name?ssl=true',
//  spoonacular: 'your-spoonacular-key'
// };


const unirest = require('unirest');
const fs = require('fs');
const keys = require('./keys');
const config = require('./config');
const pgp = require('pg-promise')();

const db = pgp(config.databaseURL);

const number_of_recipes = 1;
function get_field(name, good_or_bad) {
  const gb = good_or_bad;
  let i = 0;
  while (i < gb.length && gb[i].recipe_name != name) {
    i++;
  }
  if (gb[i]) { return parseFloat(gb[i].amount); }
  return 0;
}

function get_nutritional_info(recipes) {
  for (let i = 0; i < recipes.length; i++) {
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
          get_field('Potassium', nutr.good),
          // sodium,
          get_field('Sodium', nutr.bad),
          // cholesterol,
          get_field('Cholesterol', nutr.bad),
          // trans_fat,
          0,
          // saturated_fat,
          get_field('Saturated Fat', nutr.bad),
          // carbohydrates,
          get_field('Carbohydrates', nutr.bad),
          // fiber,
          get_field('Fiber', nutr.good),
          // protein,
          get_field('Protein', nutr.good),
          // vitamin_c,
          get_field('Vitamin C', nutr.good),
          // calcium,
          get_field('Calcium', nutr.good),
          // iron,
          get_field('Iron', nutr.good),
          // sugar,
          get_field('Sugar', nutr.bad),
          // energy,
          parseFloat(nutr.calories),
          // fat,
          get_field('Fat', nutr.bad),
          // vitamin_a,
          get_field('Vitamin A', nutr.good),
          // ingredients,
          JSON.stringify(recipe.extendedIngredients),
          // recipe_name,
          recipe.recipe_name,
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
        db.none(stmt, values);
      });
  }
}

function get_random_recipe() {
  unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=${number_of_recipes}`)
    .header('X-RapidAPI-Key', keys.spoonacular)
    .end((result) => {
    // console.log(result.body.recipes);
      get_nutritional_info(result.body.recipes);
    });
}

get_random_recipe();
