async function insertPlan(db, id, plan) {
  const json = JSON.stringify(plan);
  const stmt = `
    UPDATE users
    SET plan = $2, plan_day = 1, plan_meal = 1
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, json])
    .then(data => {
      return;
    })
    .catch(error => {
      return error;
    });
}

async function retrievePlan(db, id) {
  const stmt = `
    SELECT plan from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

async function setPlanDay(db, id, day) {
  const stmt = `
    UPDATE users
    SET plan_day = $2
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, day])
    .then(data => {
      return;
    })
    .catch(error => {
      return error;
    });
}

async function setPlanMeal(db, id, meal) {
  const stmt = `
    UPDATE users
    SET plan_meal = $2
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, meal])
    .then(data => {
      return;
    })
    .catch(error => {
      return error;
    });
}

async function getPlanDay(db, id) {
  const stmt = `
    SELECT plan_day from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => {
      return parseInt(data.plan_day);
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

async function getPlanMeal(db, id) {
  const stmt = `
    SELECT plan_meal from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id])
    .then(data => {
      return parseInt(data.plan_meal);
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

module.exports = {
  insertPlan, retrievePlan, setPlanDay, setPlanMeal, getPlanDay, getPlanMeal,
}
