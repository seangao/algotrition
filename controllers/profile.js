const profileModels = require('../models/profile');
const registerModels = require('../models/register');

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
          name: 'username',
          value: query.username,
          icon: 'fas fa-user',
          number: false,
          edit: true,
        },
        {
          name: 'height',
          value: height,
          icon: 'fas fa-ruler-vertical',
          feet: feetInches[0],
          inch: feetInches[1],
        },
        {
          name: 'weight',
          value: `${query.weight} pounds`,
          icon: 'fas fa-weight',
          number: true,
          edit: true,

        },
        {
          name: 'age',
          value: query.age,
          icon: 'fas fa-birthday-cake',
          number: true,
          edit: true,
        },
        {
          name: 'gender',
          value: query.gender,
          icon: 'fas fa-venus-mars',
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
          name: 'allergens',
          value: 'None',
          icon: 'fas fa-exclamation-circle',
          number: false,
          edit: true,
        },
        {
          name: 'calorie preference',
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
  res.render('profile', { title: 'Account', user });
}

async function updateProfile(req, res) {
  await profileModels.updateProfile(req.app.locals.db, req.session.userid, req.body);
  res.redirect('../profile');
}

module.exports = {
  generateProfile, updateProfile,
};
