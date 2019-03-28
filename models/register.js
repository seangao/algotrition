async function insertNewUser(db, user) {
  const stmt = `
      INSERT INTO public."Users" (username, password, age, height, weight)
      VALUES ($1, $2, $3, 160, $4)
      RETURNING id, username, age, height, weight
  `;
  return db.one(stmt, [user.username, user.password, user.age, user.weight]);
}

module.exports = {
  insertNewUser
};
