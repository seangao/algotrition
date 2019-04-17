async function insertPlan(db, id, plan) {
  const json = JSON.stringify(plan);
  const stmt = `
    UPDATE users
    SET plan = $2
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id, json]);
}

async function retrievePlan(db, id) {
  const stmt = `
    SELECT plan from users
    WHERE id = $1
  `;
  return db.oneOrNone(stmt, [id]);
}

module.exports = {
  insertPlan
}
