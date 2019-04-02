const unirest = require('unirest');
const fs = require('fs');
const keys = require('./keys');

unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=200")
.header("X-RapidAPI-Key", keys.spoonacular)
.end(function (result) {
  console.log(result.status, result.headers, result.body);
  let recipes = result.body.recipes;
  for (let i = 0; i < recipes.length; i++)
  {
    let recipe = recipes[i];
    fs.writeFile('./sp_recipes/'+recipe.id+'.json',JSON.stringify(recipe), err => {if (err) throw err});
  }
});
