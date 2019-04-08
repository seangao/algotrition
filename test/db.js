const expect = require('chai').expect;

const app = require('../app');
const db = app.locals.db;
const registerModel = require('../models/register');
const loginModel = require('../models/login');
const profileModel = require('../models/profile');
const recipesModel = require('../models/recipes');

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

  it('search user by username', async function() {
    const data = await loginModel.searchUser(db, { username: 'test1' });
    expect(data).to.satisfy(function(d) {
      return d.id === 1 &&
        d.username === 'test1' &&
        d.age === 20 &&
        d.weight === 120;
    });
  });

  it('search user by id', function() {
    profileModel.searchUserbyID(db, 1)
    .then(data => {
      expect(data).to.satisfy(function(d) {
        return d.id === 1 &&
          d.username === 'test1' &&
          d.age === 20 &&
          d.weight === 120;
      });
    });
  });

  it('update profile', function() {
    profileModel.updateProfile(db, 1, {
      Name: 'test2',
      Weight: 140,
      Age: 30
    })
    .then(data => {
      expect(data).to.satisfy(function(d) {
        return d.id === 1 &&
          d.username === 'test2' &&
          d.age === 30 &&
          d.weight === 140;
      });
    });
  });

  it('get recipes', function () {
    recipesModel.getAllRecipes(db)
    .then(data => {
      expect(data).to.not.equal(null);
    });
  });

});
