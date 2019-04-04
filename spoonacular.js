const unirest = require('unirest');
const fs = require('fs');
const keys = require('./keys');
const config = require('./config');
const pgp = require('pg-promise')();
var db = pgp(config.databaseURL);

function get_field(name,good_or_bad) {
  const gb = good_or_bad;
  let i = 0;
  //console.log('gb:    ',gb);
  while (i < gb.length && gb[i].title != name) {
    i++;
  }
  if (gb[i]) {console.log(parseFloat(gb[i].amount)); return parseFloat(gb[i].amount);}
  else {return 0;}
}

function get_nutritional_info(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipe.id+"/nutritionWidget.json")
    .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", keys.spoonacular)
    .end(function (result) {
      let nutr = result.body;
      console.log(nutr);
      let stmt = `INSERT INTO recipes_sp (
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
        title,
        instructions,
        source_site_url,
        very_healthy,
        cheap,
        very_popular,
        preparation_minutes,
        cooking_minutes,
        price_per_serving,
        cuisine,
        ready_in_minutes,
        servings
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46)`;

      let values = [
        // id,
        recipe.id,
        // total_time_seconds,
        60 * recipe.readyInMinutes,
        // breakfast,
        (recipe.dishTypes.includes('breakfast'))?1:0,
        // lunch,
        (recipe.dishTypes.includes('lunch'))?1:0,
        // dinner,
        (recipe.dishTypes.includes('dinner'))?1:0,
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
        get_field('Potassium',nutr.good),
        // sodium,
        get_field('Sodium',nutr.bad),
        // cholesterol,
        get_field('Cholesterol',nutr.bad),
        // trans_fat,
        0,
        // saturated_fat,
        get_field('Saturated Fat',nutr.bad),
        // carbohydrates,
        get_field('Carbohydrates',nutr.bad),
        // fiber,
        get_field('Fiber',nutr.good),
        // protein,
        get_field('Protein',nutr.good),
        // vitamin_c,
        get_field('Vitamin C', nutr.good),
        // calcium,
        get_field('Calcium',nutr.good),
        // iron,
        get_field('Iron',nutr.good),
        // sugar,
        get_field('Sugar',nutr.bad),
        // energy,
        parseFloat(nutr.calories),
        // fat,
        get_field('Fat',nutr.bad),
        // vitamin_a,
        get_field('Vitamin A',nutr.good),
        // ingredients,
        JSON.stringify(recipe.ingredients),
        // title,
        recipe.title,
        // instructions,
        recipe.instructions,
        // source_site_url,
        recipe.sourceSiteUrl,
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
        // price_per_saving,
        recipe.pricePerSaving,
        // cuisines,
        JSON.stringify(recipe.cuisines),
        // ready_in_minutes,
        recipe.readyInMinutes,
        // servings
        recipe.Servings
      ]
      db.none(stmt,values);
    });
  }
}

function get_random_recipe() {
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=2")
  .header("X-RapidAPI-Key", keys.spoonacular)
  .end(function (result) {
    console.log(result.body.recipes);
    get_nutritional_info(result.body.recipes);
  });
}

get_random_recipe();