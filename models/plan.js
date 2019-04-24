const optimizers = [
  {
    desc: 'Minimize cooking time',
    id: 0,
  },
  {
    desc: 'Minimize cost',
    id: 1,
  },
  {
    desc: 'Minimize calories',
    id: 2,
  },
  {
    desc: 'Maximize calories',
    id: 3,
  },
];

const allergens = [
  'Dairy',
  'Egg',
  'Gluten',
  'Peanut',
  'Seafood',
  'Sesame',
  'Soy',
  'Sulfite',
  'Tree Nuts',
  'Wheat',
];

const diets = [
  'Vegetarian',
  'Vegan',
  'Ketogenic',
];

const nutrients = [
  {
    name: 'Potassium',
    short: 'K',
    id: 'potassium',
    units: 'mg',
    min: 3000,
    max: 4000,
  },
  {
    name: 'Sodium',
    short: 'Na',
    id: 'sodium',
    units: 'mg',
    min: 2000,
    max: 3000,
  },
  {
    name: 'Calcium',
    short: 'Ca',
    id: 'calcium',
    units: 'mg',
    min: 0,
    max: 2000,
  },
  {
    name: 'Iron',
    short: 'Fe',
    id: 'iron',
    units: 'mg',
    min: 0,
    max: 50,
  },
  {
    name: 'Total Saturated Fat',
    short: 'Sat Fat',
    id: 'satfat',
    units: 'g',
    min: 10,
    max: 30,
  },
  {
    name: 'Total Trans Fat',
    short: 'Trans Fat',
    id: 'transfat',
    units: 'g',
    min: 0,
    max: 10,
  },
  {
    name: 'Total Sugars',
    short: 'Sugar',
    id: 'sugar',
    units: 'g',
    min: 0,
    max: 100,
  },
  {
    name: 'Carbohydrates',
    short: 'Carbs',
    id: 'carbs',
    units: 'g',
    min: 200,
    max: 400,
  },
  {
    name: 'Fiber',
    short: 'Fiber',
    id: 'fiber',
    units: 'g',
    min: 20,
    max: 30,
  },
  {
    name: 'Protein',
    short: 'Protein',
    id: 'protein',
    units: 'g',
    min: 30,
    max: 70,
  },
  {
    name: 'Vitamin A',
    short: 'Vit A',
    id: 'vita',
    units: 'IU',
    min: 4000,
    max: 6000,
  },
  {
    name: 'Vitamin C',
    short: 'Vit C',
    id: 'vitc',
    units: 'mg',
    min: 40,
    max: 80,
  },
  {
    name: 'Total Fat',
    short: 'Fat',
    id: 'fat',
    units: 'g',
    min: 50,
    max: 80,
  },
];

/**
 * Insert user's current meal plan to database.
 * @param {object} - database
 * @param {integer} - user id
 * @param {object} - plan json
 */
async function insertPlan(db, id, plan) {
  const json = JSON.stringify(plan);
  const stmt = `
    UPDATE users
    SET plan = $2, plan_day = 1, plan_meal = 1
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, json])
    .then((data) => {

    })
    .catch(error => error);
}

/**
 * Insert user's constraints to database.
 * @param {object} - database
 * @param {integer} - user id
 * @param {object} - constraints json
 */
async function insertConstraints(db, id, constraints) {
  const json = JSON.stringify(constraints);
  const stmt = `
    UPDATE users
    SET constraints = $2
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, json])
    .then((data) => {

    })
    .catch(error => error);
}

/**
 * Insert user's disliked recipes to database.
 * @param {object} - database
 * @param {integer} - user id
 * @param {object} - rejected recipes json
 */
async function insertRejectedRecipes(db, id, recipes) {
  const json = JSON.stringify(recipes);
  const stmt = `
    UPDATE users
    SET rejected_recipes = $2
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, json])
    .then((data) => {

    })
    .catch(error => error);
}

/**
 * Retrieve meal plan.
 * @param {object} - database
 * @param {integer} - user id
 * @returns {object} - plan json
 */
async function retrievePlan(db, id) {
  const stmt = `
    SELECT plan from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

/**
 * Retrieve constraints.
 * @param {object} - database
 * @param {integer} - user id
 * @returns {object} - constraints json
 */
async function retrieveConstraints(db, id) {
  const stmt = `
    SELECT constraints from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

/**
 * Retrieve rejected recipes.
 * @param {object} - database
 * @param {integer} - user id
 * @returns {object} - rejected recipes json
 */
async function retrieveRejectedRecipes(db, id) {
  const stmt = `
    SELECT rejected_recipes from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

/**
 * Set plan day number.
 * @param {object} - database
 * @param {integer} - user id
 * @param {integer} - day number to set to
 */
async function setPlanDay(db, id, day) {
  const stmt = `
    UPDATE users
    SET plan_day = $2
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, day])
    .then((data) => {

    })
    .catch(error => error);
}

/**
 * Set plan meal number.
 * @param {object} - database
 * @param {integer} - user id
 * @param {integer} - meal number to set to
 */
async function setPlanMeal(db, id, meal) {
  const stmt = `
    UPDATE users
    SET plan_meal = $2
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, meal])
    .then((data) => {

    })
    .catch(error => error);
}

/**
 * Get current plan day.
 * @param {object} - database
 * @param {integer} - user id
 * @returns {integer} - plan day
 */
async function getPlanDay(db, id) {
  const stmt = `
    SELECT plan_day from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => parseInt(data.plan_day))
    .catch((error) => {
      console.log(error);
      return error;
    });
}

/**
 * Get current plan meal number.
 * @param {object} - database
 * @param {integer} - user id
 * @returns {integer} - plan meal
 */
async function getPlanMeal(db, id) {
  const stmt = `
    SELECT plan_meal from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => parseInt(data.plan_meal))
    .catch((error) => {
      console.log(error);
      return error;
    });
}

module.exports = {
  optimizers, allergens, diets, nutrients, insertPlan, insertConstraints, insertRejectedRecipes, retrievePlan, retrieveConstraints, retrieveRejectedRecipes, setPlanDay, setPlanMeal, getPlanDay, getPlanMeal,
};
