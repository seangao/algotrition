const bcrypt = require('bcrypt');
const { expect } = require('chai');

const app = require('../app');

const { db } = app.locals;
const registerModel = require('../models/register');
const loginModel = require('../models/login');
const profileModel = require('../models/profile');
const recipesModel = require('../models/recipes');
const sqlModel = require('../models/sql');

describe('database', () => {
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
      gender: 'male',
      age: 20,
      weight: 120,
      ft: 5,
      in: 10,
    });
    expect(data.id).to.equal(1);
  });

  it('search user by username', async () => {
    const data = await loginModel.searchUser(db, { username: 'test1' });
    expect(data).to.satisfy(d => d.id === 1
        && d.username === 'test1'
        && bcrypt.compareSync('test', d.password)
        && d.age === 20
        && d.weight === 120
        && d.gender === 'male'
        && d.height === 178);
  });

  it('search user by id', async () => {
    const data = await profileModel.searchUserbyID(db, 1);
    expect(data).to.satisfy(d => d.username === 'test1'
        && d.age === 20
        && d.weight === 120
        && d.gender === 'male'
        && d.height === 178);
  });

  it('change password', async () => {
    await loginModel.changePasswordbyUsername(db, {
      username: 'test1',
      password: 'newpassword',
    });
    const stmt = `
        SELECT password FROM users WHERE
        username = 'test1'
    `;
    const data = await db.oneOrNone(stmt);
    expect(data).to.satisfy(d => bcrypt.compareSync('newpassword', d.password));
  });

  it('update profile', async () => {
    const data = await profileModel.updateProfile(db, 1, {
      username: 'test2',
      weight: 140,
      age: 30,
      gender: 'female',
      ft: 5,
      in: 10,
    });
    expect(data).to.satisfy(d => d.id === 1
        && d.username === 'test2'
        && d.age === 30
        && d.weight === 140
        && d.gender === 'female');
  });

  it('get recipes', async () => {
    const data = await recipesModel.getAllRecipes(db);
    expect(data).to.not.equal(null);
  });
});
