const profileModels = require('../models/profile')

async function getProfile(req, res, next) {
  if (!req.session.user)
      res.render('login', { title: 'Login', header_menu: false , err : "Please log in first!"});
  else
      next();
}

async function generateProfile(req, res) {
  console.log(req.session.id)
  var query = await profileModels.searchUserbyID(req.app.locals.db, req.session.userid);
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
