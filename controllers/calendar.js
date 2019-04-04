const url = require('url');
const optimizer = require('../models/optimizer.js');

function calendar(req, res, next) {
  if (!req.session.user)
      res.redirect('/');

  //Code to read in the saved meal plan from a text file
  var fs = require("fs");
  var week_string = fs.readFileSync("./saved_plans/recipe1.txt").toString('utf-8');
  var week = JSON.parse(week_string);

  var queryData = url.parse(req.url, true).query;
  if (queryData.eaten_day) {
    week = optimizer.increment_active_meal('./saved_plans/recipe1.txt', week, queryData.eaten_day, queryData.eaten_meal);
  }
  res.render('calendar', { title: 'Calendar', week: week, user: req.session.user });
}

module.exports = {
    calendar
};
