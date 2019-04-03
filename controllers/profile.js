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
          value: query.username,
          icon: 'fa-user',
          number: false,
          edit: true,
        },
        {
          name: "Weight",
          value: query.weight + " pounds",
          icon: 'fa-weight',
          number: true,
          edit: true

        },
        {
          name: "Age",
          value: query.age,
          icon: 'fa-birthday-cake',
          number: true,
          edit: true
        },
        {
          name: "Gender",
          value: "male",
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
          number: false,
          edit: true
        },
        {
          name: "Calorie Preference",
          value: 2000,
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
