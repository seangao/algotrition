const assert = require('chai').assert;
const expect = require('chai').expect;

const app = require('../app');
const db = app.locals.db;

describe ('db', function() {
  it('create users database', function(done) {
    db.none(`
      create table users (
        id serial primary key,
        username varchar (100) unique not null,
        password varchar (100) not null,
        age numeric,
        height numeric,
        weight numeric
      );
    `)
    .then(() => done());
  });
});
