const bcrypt = require('bcrypt');
const { expect } = require('chai');

const app = require('../app');

const { db } = app.locals;
const registerModel = require('../models/register');
const loginModel = require('../models/login');
const profileModel = require('../models/profile');
const recipesModel = require('../models/recipes');
const sqlModel = require('../models/sql');

describe('db', () => {
  // it('create users database', (done) => {
  //   db.none(`
  //     create table users (
  //       id serial primary key,
  //       username varchar (100) unique not null,
  //       password varchar (100) not null,
  //       age numeric,
  //       height numeric,
  //       weight numeric
  //     );
  //   `)
  //     .then(() => done());
  // });

  it('create users database', (done) => {
    db.none(sqlModel.readSQLFile('test/users.sql'))
      .then(() => done());
  });

  it('create spoonacular recipes database', (done) => {
    db.none(sqlModel.readSQLFile('test/recipes_sp.sql'))
      .then(() => done());
  });

  it('insert new user manually', async () => {
    const data = await registerModel.insertNewUser(db, {
      username: 'test1',
      password: 'test',
      age: 20,
      weight: 120,
    });
    expect(data.id).to.equal(1);
  });

  it('search user by username', async () => {
    const data = await loginModel.searchUser(db, { username: 'test1' });
    expect(data).to.satisfy(d => d.id === 1
        && d.username === 'test1'
        && bcrypt.compareSync('test', d.password)
        && d.age === '20'
        && d.weight === '120');
  });

  it('search user by id', async () => {
    const data = await profileModel.searchUserbyID(db, 1);
    expect(data).to.satisfy(d => d.username === 'test1'
        && bcrypt.compareSync('test', d.password)
        && d.age === '20'
        && d.weight === '120');
  });

  it('update profile', async () => {
    const data = await profileModel.updateProfile(db, 1, {
      Name: 'test2',
      Weight: 140,
      Age: 30,
    });
    expect(data).to.satisfy(d => d.id === 1
        && d.username === 'test2'
        && d.age === '30'
        && d.weight === '140');
  });

  it('get recipes', async () => {
    const data = await recipesModel.getAllRecipes(db);
    expect(data).to.not.equal(null);
  });
});
