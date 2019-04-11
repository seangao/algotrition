async function getAllRecipes(db) {
  const stmt = `
        SELECT * FROM recipes_sp LIMIT 500
    `;
  const recipes = await db.manyOrNone(stmt);
  return recipes;
}

async function saveNewRecipe(db, userid, title, ingredients, instructions) {
    console.log(typeof ingredients);
    console.log(typeof instructions);
    const stmt = `
        INSERT INTO user_recipes (userid, title, ingredients, instructions)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `;
    return db.one(stmt, [userid, title, ingredients, instructions]);
}

async function getUserRecipes(db, userid) {
    console.log("getting user recipe " + userid);
    const stmt = `
        SELECT * FROM user_recipes WHERE userid = $1
    `;

    return db.manyOrNone(stmt, [userid]);
}

module.exports = {
  getAllRecipes, saveNewRecipe, getUserRecipes,
};
