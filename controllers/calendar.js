const url = require('url');
const fs = require('fs');
const optimizer = require('../models/optimizer.js');
const planModel = require('../models/plan.js');
const updateCalendar = require('../models/updateCalendar.js');

async function calendar(req, res, next) {
  // Code to read in the saved meal plan from a text file
  let week;
  if (req.session.user && req.cookies.user_sid) {
    const data = await planModel.retrievePlan(req.app.locals.db, req.session.userid);
    if (data.plan === null) {
      next();
    }
    week = JSON.parse(data.plan);
  } else {
    if (!req.session.calendar) { next(); }
    week = req.session.calendar;
  }

  const queryData = url.parse(req.url, true).query;
  if (queryData.eaten_day) {
    week = await updateCalendar.incrementActiveMeal(req, queryData.eaten_day, queryData.eaten_meal);
  }
  if (queryData.delete_id) {
    week = await updateCalendar.deleteRecipeFromCalendar(req, queryData.delete_id);
  }
  res.render('calendar', { title: 'Calendar', week, user: req.session.user });
}

module.exports = {
  calendar,
};
