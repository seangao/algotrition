const { expect } = require('chai');

const app = require('../app');

const { db } = app.locals;
const registerModel = require('../models/register');
const loginModel = require('../models/login');
const profileModel = require('../models/profile');
const recipesModel = require('../models/recipes');

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
        expect(data).to.satisfy(d => d.id === 1
          && d.username === 'test1'
          && d.age === 20
          && d.weight === 120);
      });
  });

  it('search user by id', () => {
    profileModel.searchUserbyID(db, 1)
      .then((data) => {
        expect(data).to.satisfy(d => d.id === 1
          && d.username === 'test1'
          && d.age === 20
          && d.weight === 120);
      });
  });

  it('update profile', () => {
    profileModel.updateProfile(db, 1, {
      Name: 'test2',
      Weight: 140,
      Age: 30,
    })
      .then((data) => {
        expect(data).to.satisfy(d => d.id === 1
          && d.username === 'test2'
          && d.age === 30
          && d.weight === 140);
      });
  });

  it('get recipes', () => {
    recipesModel.getAllRecipes(db)
      .then((data) => {
        expect(data).to.not.equal(null);
      });
  });
});
