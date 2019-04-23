async function getAllRecipes(db) {
  const stmt = `
        SELECT * FROM recipes_sp WHERE breakfast=1 OR lunch=1 OR dinner=1  LIMIT 500
    `;
  const recipes = await db.manyOrNone(stmt);
  return recipes;
}

async function getSpoonRecipeById(db, recipe_id) {
  const stmt = `
        SELECT * FROM recipes_sp WHERE id = $1
  `;
  return db.oneOrNone(stmt, [recipe_id])
    .then(data => data)
    .catch(error => error);
}

async function saveNewRecipe(db, userid, title, ingredients, instructions) {
  const stmt = `
        INSERT INTO user_recipes (userid, title, ingredients, instructions)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `;
  return db.one(stmt, [userid, title, ingredients, instructions])
    .then(data => data)
    .catch(error => error);
}

async function deleteRecipe(db, id) {
  const stmt = `
        DELETE FROM user_recipes WHERE id = $1
  `;
  return db.manyOrNone(stmt, [id])
    .then(data => data)
    .catch(error => error);
}

async function getUserRecipes(db, userid) {
  const stmt = `
        SELECT * FROM user_recipes WHERE userid = $1
    `;

  return db.manyOrNone(stmt, [userid])
    .then(data => data)
    .catch(error => error);
}

async function getRecipeById(db, recipe_id) {
  const stmt = `
        SELECT * FROM user_recipes WHERE id = $1
  `;
  return db.oneOrNone(stmt, [recipe_id])
    .then(data => data)
    .catch(error => error);
}

async function updateRecipeById(db, recipe_id, title, ingredients, instructions) {
  const stmt = `
        UPDATE user_recipes
        SET title = $2, ingredients = $3, instructions = $4
        WHERE id = $1
  `;
  return db.oneOrNone(stmt, [recipe_id, title, ingredients, instructions])
    .then(data => data)
    .catch(error => error);
}

module.exports = {
  getAllRecipes, getSpoonRecipeById, saveNewRecipe, deleteRecipe, getUserRecipes, getRecipeById, updateRecipeById,
};
