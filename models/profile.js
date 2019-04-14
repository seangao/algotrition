async function searchUserbyID(db, id) {
  const stmt = `
       SELECT username, age, height, weight, gender FROM users WHERE
       id = $1
   `;
  return db.oneOrNone(stmt, [id]);
}

async function updateProfile(db, id, info) {
  const stmt = `
        UPDATE users
        SET username = '$2:value', weight = $3, age = $4, gender = $5
        WHERE id = $1
        RETURNING id, username, height, weight, age, gender
    `;
  return db.oneOrNone(stmt, [id, info.Username, info.Weight, info.Age, info.Gender]);
}

module.exports = {
  searchUserbyID, updateProfile,
};
