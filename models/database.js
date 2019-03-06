const pg = require('pg');

//local postgres database configuration
const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

module.exports = client;

