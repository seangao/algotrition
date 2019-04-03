const assert = require('chai').assert;
const expect = require('chai').expect;

const app = require('../app');
const db = app.locals.db;
const registerModels = require('../models/register');

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

  it('insert new user manually', function(done) {
    registerModels.insertNewUser(db, {
      username: 'test1',
      password: 'test',
      age: 20,
      weight: 120,
    })
      .then(() => done());
  });
});
