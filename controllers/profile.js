const profileModels = require('../models/profile');
const registerModels = require('../models/register');

async function getProfile(req, res, next) {
  if (!req.session.user)
      res.render('login', { title: 'Login', header_menu: false , loginerr : "Please log in first!"});
  else
      next();
}

async function generateProfile(req, res) {
  console.log(req.session.id)
  var query = await profileModels.searchUserbyID(req.app.locals.db, req.session.userid);
  const feet_inch = registerModels.reverseHeight(query.height);
  var user = [
    {
      name: "General",
      id: 0,
      items: [
        {
          name: "Name",
          value: query.username,
          icon: 'fas fa-user',
          number: false,
          edit: true,
        },
        {
          name: "Height",
          value: feet_inch[0] + " feets " + feet_inch[1] + " inches",
          icon: 'fas fa-ruler-vertical',
          feet: feet_inch[0],
          inch: feet_inch[1],
        },
        {
          name: "Weight",
          value: query.weight + " pounds",
          icon: 'fas fa-weight',
          number: true,
          edit: true

        },
        {
          name: "Age",
          value: query.age,
          icon: 'fas fa-birthday-cake',
          number: true,
          edit: true
        },
        {
          name: "Gender",
          value: "Female",
          icon: 'fas fa-genderless',
          number: false,
          edit: true
        }
      ]
    },
    {
      name: "Nutritional Information",
      id: 1,
      items: [
        {
          name: "Allergens",
          value: "None",
          icon: 'fas fa-exclamation-circle',
          number: false,
          edit: true
        },
        {
          name: "Calorie Preference",
          value: 2000,
          icon: 'fas fa-utensils',
          number: true,
          edit: true
        }
      ]
    },
    {
      name: "History",
      id: 2,
      items: [
        {
          name: "Previous plans",
          value: "Link to plans",
          number: false,
          edit: false
        }
      ]
    }
  ]
  res.render('profile', {title: "My Profile", user : user});
}

module.exports = {
    generateProfile, getProfile
};
