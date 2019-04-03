async function searchUserbyID(db, id) {
   const stmt = `
       SELECT username, age, height, weight FROM users WHERE
       id = $1
   `;
   return db.oneOrNone(stmt, [id])
}

async function updateProfile(db, id, info) {
    const stmt = `
        UPDATE users
        SET username = '$2:value', weight = $3, age = $4
        WHERE id = $1
        RETURNING id, username, height, weight, age
    `;
    return db.oneOrNone(stmt, [id, info.Name, info.Weight, info.Age])
}

module.exports = {
    searchUserbyID, updateProfile
};
