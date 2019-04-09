const url = require('url');
const fs = require('fs');
const optimizer = require('../models/optimizer.js');

function calendar(req, res) {
  // Code to read in the saved meal plan from a text file
  const weekString = fs.readFileSync('./saved_plans/recipe1.txt').toString('utf-8');
  let week = JSON.parse(weekString);

  const queryData = url.parse(req.url, true).query;
  if (queryData.eaten_day) {
    week = optimizer.incrementActiveMeal('./saved_plans/recipe1.txt', week, queryData.eaten_day, queryData.eaten_meal);
  }
  res.render('calendar', { title: 'Calendar', week, user: req.session.user });
}

module.exports = {
  calendar,
};
