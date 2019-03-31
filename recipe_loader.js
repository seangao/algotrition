//This file creates a table "recipes" and loads recipes in database from the env variable RECIPES_FOLDER
//Use with: RECIPES_FOLDER=./recipes_for_testing node recipe_loader.js

const fs = require('fs');
const pgp = require('pg-promise')();

const folder = "./recipes_for_testing";

const config = require('./config');
var db = pgp(config.databaseURL);

// const drop_stmt = `DROP TABLE recipes`;
// db.none(drop_stmt);

const creation_stmt = `
  CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    energy FLOAT,
    saturated_fat FLOAT,
    trans_fat FLOAT,
    soy BOOLEAN,
    image_url_large TEXT,
    breakfast INT,
    sugar FLOAT,
    protein FLOAT,
    sulfite BOOLEAN,
    ingredients TEXT,
    attribution_html TEXT,
    total_time_seconds FLOAT,
    vitamin_a FLOAT,
    dinner INT,
    source_recipe_url TEXT,
    attribution_url TEXT,
    recipe_name TEXT,
    dairy BOOLEAN,
    attribution_text TEXT,
    potassium FLOAT,
    fiber FLOAT,
    wheat BOOLEAN,
    gluten BOOLEAN,
    yummly_id TEXT,
    image_url_small TEXT,
    cholesterol FLOAT,
    vegan BOOLEAN,
    tree_nut BOOLEAN,
    lunch INT,
    attribution_logo TEXT,
    fat FLOAT,
    vitamin_c FLOAT,
    carbohydrates FLOAT,
    source_display_name TEXT,
    seafood BOOLEAN,
    sodium FLOAT,
    image_url_medium TEXT,
    ketogenic BOOLEAN,
    sesame BOOLEAN,
    calcium FLOAT,
    source_site_url TEXT,
    iron FLOAT,
    peanut BOOLEAN,
    vegetarian BOOLEAN,
    egg BOOLEAN,
    number_servings FLOAT,
    "tree-nut" BOOLEAN,
    "all-allergens" BOOLEAN
  );
`;

async function create_table() {
  await db.none(creation_stmt);
}

var stmt = `
  INSERT INTO recipes (
    energy,
    saturated_fat,
    trans_fat,
    soy,
    image_url_large,
    breakfast,
    sugar,
    protein,
    sulfite,
    ingredients,
    attribution_html,
    total_time_seconds,
    vitamin_a,
    dinner,
    source_recipe_url,
    attribution_url,
    recipe_name,
    dairy,
    attribution_text,
    potassium,
    fiber,
    wheat,
    gluten,
    yummly_id,
    image_url_small,
    cholesterol,
    vegan,
    tree_nut,
    lunch,
    attribution_logo,
    fat,
    vitamin_c,
    carbohydrates,
    source_display_name,
    seafood,
    sodium,
    image_url_medium,
    ketogenic,
    sesame,
    calcium,
    source_site_url,
    iron,
    peanut,
    vegetarian,
    egg,
    number_servings,
    "tree-nut",
    "all-allergens"
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48)`

const recipe_attributes = [
  'energy',
  'saturated_fat',
  'trans_fat',
  'soy',
  'image_url_large',
  'breakfast',
  'sugar',
  'protein',
  'sulfite',
  'ingredients',
  'attribution_html',
  'total_time_seconds',
  'vitamin_a',
  'dinner',
  'source_recipe_url',
  'attribution_url',
  'recipe_name',
  'dairy',
  'attribution_text',
  'potassium',
  'fiber',
  'wheat',
  'gluten',
  'yummly_id',
  'image_url_small',
  'cholesterol',
  'vegan',
  'tree_nut',
  'lunch',
  'attribution_logo',
  'fat',
  'vitamin_c',
  'carbohydrates',
  'source_display_name',
  'seafood',
  'sodium',
  'image_url_medium',
  'ketogenic',
  'sesame',
  'calcium',
  'source_site_url',
  'iron',
  'peanut',
  'vegetarian',
  'egg',
  'number_servings',
  'tree-nut',
  'all-allergens'];

async function add_to_table() {
  await create_table();
  var files = fs.readdirSync(folder);
  for (var i = 0; i < files.length; i++) {
    var text = fs.readFileSync(folder + '/' + files[i]).toString('utf-8');
  	var recipe = JSON.parse(text);
    var recipe_arr = [];
    for (var j = 0; j < recipe_attributes.length; j++) {
      const attribute = recipe_attributes[j];
        recipe_arr[j] = recipe[attribute];
        }
    db.none(stmt,recipe_arr);
  }
}

add_to_table();
