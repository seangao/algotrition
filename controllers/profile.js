const profileModels = require('../models/profile');
const registerModels = require('../models/register');

async function getProfile(req, res, next) {
  if (!req.session.user) res.render('login', { title: 'Login', header_menu: false, loginerr: 'Please log in first!' });
  else next();
}

async function generateProfile(req, res) {
  const query = await profileModels.searchUserbyID(req.app.locals.db, req.session.userid);
  const feetInches = registerModels.reverseHeight(query.height);
  let height = feetInches[0];

  if (feetInches[0] === 1) {
    height += ' foot ';
  } else {
    height += ' feet ';
  }
  height += feetInches[1];

  if (feetInches[1] === 1) {
    height += ' inch';
  } else {
    height += ' inches';
  }

  const user = [
    {
      name: 'General',
      id: 0,
      items: [
        {
          name: 'Username',
          value: query.username,
          icon: 'fas fa-user',
          number: false,
          edit: true,
        },
        {
          name: 'Height',
          value: height,
          icon: 'fas fa-ruler-vertical',
          feet: feetInches[0],
          inch: feetInches[1],
        },
        {
          name: 'Weight',
          value: `${query.weight} pounds`,
          icon: 'fas fa-weight',
          number: true,
          edit: true,

        },
        {
          name: 'Age',
          value: query.age,
          icon: 'fas fa-birthday-cake',
          number: true,
          edit: true,
        },
        {
          name: 'Gender',
          value: 'Female',
          icon: 'fas fa-genderless',
          number: false,
          edit: true,
        },
      ],
    },
    {
      name: 'Nutritional Information',
      id: 1,
      items: [
        {
          name: 'Allergens',
          value: 'None',
          icon: 'fas fa-exclamation-circle',
          number: false,
          edit: true,
        },
        {
          name: 'Calorie Preference',
          value: 2000,
          icon: 'fas fa-utensils',
          number: true,
          edit: true,
        },
      ],
    },
    {
      name: 'History',
      id: 2,
      items: [
        {
          name: 'Previous plans',
          value: 'Link to plans',
          number: false,
          edit: false,
        },
      ],
    },
  ];
  res.render('profile', { title: 'My Profile', user });
}

async function updateProfile(req, res) {
  await profileModels.updateProfile(req.app.locals.db, req.session.userid, req.body);
  res.redirect('profile');
}

module.exports = {
  generateProfile, getProfile, updateProfile,
};
