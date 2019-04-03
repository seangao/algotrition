const assert = require('chai').assert;
const expect = require('chai').expect;

const app = require('../app');
const db = app.locals.db;
const registerModel = require('../models/register');
const loginModel = require('../models/login');

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

  it('insert new user manually', function() {
    registerModel.insertNewUser(db, {
      username: 'test1',
      password: 'test',
      age: 20,
      weight: 120,
    })
    .then(data => {
      expect(data.id).to.equal(1);
    });
  });

  it('search for user in database', function() {
    loginMode.searchUser(db, { username: 'test1' })
    .then(data => {
      expect(data).to.satisfy(function(data) {
        return data.id == 1 &&
          data.username == 'test1' &&
          data.age == 20 &&
          data.weight == 120;
      });
    });
  });


});
