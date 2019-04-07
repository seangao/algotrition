const { assert } = require('chai');
const { expect } = require('chai');

const app = require('../app');

const { db } = app.locals;
const registerModel = require('../models/register');
const loginModel = require('../models/login');

describe('db', () => {
  it('create users database', (done) => {
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

  it('insert new user manually', () => {
    registerModel.insertNewUser(db, {
      username: 'test1',
      password: 'test',
      age: 20,
      weight: 120,
    })
      .then((data) => {
        expect(data.id).to.equal(1);
      });
  });

  it('search user by username', () => {
    loginModel.searchUser(db, { username: 'test1' })
      .then((data) => {
        expect(data).to.satisfy(data => data.id == 1
          && data.username == 'test1'
          && data.age == 20
          && data.weight == 120);
      });
  });

  it('search user by id', () => {
    loginModel.searchUser(db, 1)
      .then((data) => {
        expect(data).to.satisfy(data => data.id == 1
          && data.username == 'test1'
          && data.age == 20
          && data.weight == 120);
      });
  });
});
