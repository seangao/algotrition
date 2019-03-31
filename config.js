module.exports = {
  port: process.env.PORT || 3000,
  databaseURL: process.env.DATABASE_URL

  /* For local database testing: COMMENT IT when attempt to connect heroku database, DON'T DELETE */
  //databaseURL: "postgres://postgres:@localhost:5432/postgres",
};
