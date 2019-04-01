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
          value: query.username
        },
        {
          name: "Height",
          value: feet_inch[0] + " feets " + feet_inch[1] + " inches"
        },
        {
          name: "Weight",
          value: query.weight + " pounds"
        },
        {
          name: "Age",
          value: query.age
        },
        {
          name: "Gender",
          value: "male"
        }
      ]
    },
    {
      name: "Nutritional Information",
      id: 1,
      items: [
        {
          name: "Allergens",
          value: "peanuts and soy"
        },
        {
          name: "Calorie Preference",
          value: "2000"
        }
      ]
    },
    {
      name: "History",
      id: 2,
      items: [
        {
          name: "Previous plans",
          value: "Link to plans"
        }
      ]
    }
  ]
  res.render('profile', {title: "My Profile", user : user});
}

module.exports = {
    generateProfile, getProfile
};
