async function registerProcess(db, user) {
    const stmt = `
        INSERT INTO public."Users" (username, password, age, height, weight)
        VALUES ($1, $2, $3, 160, $4)
    `;
    return db.any(stmt, [user.username, user.password, user.age, user.weight]);
}

module.exports = {
    registerProcess
};