function convertHeight(feet, inch) {
  return feet * 30.48 + inch * 2.54;
}

function reverseHeight(cm) {
  const feet = Math.floor(cm / 30.48);
  const inch = Math.round((cm - feet * 30.48) / 2.54);
  return [feet, inch];
}

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
        SET username = '$2:value', weight = $3, age = $4, gender = $5, height = $6
        WHERE id = $1
        RETURNING id, username, height, weight, age, gender
    `;
  return db.oneOrNone(stmt, [id, info.username, info.weight, info.age, info.gender, convertHeight(info.ft, info.in)]);
}

module.exports = {
  searchUserbyID, updateProfile, convertHeight, reverseHeight,
};
