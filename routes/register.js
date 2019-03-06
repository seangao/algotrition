var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });


const registerControllers = require('../controllers/register');
const db = require('../models/database');

router.get('/', registerControllers.register);

router.post('/registerprocess', urlencodedParser, function (req, res) {
  db.connect(); 
  var sql = 'INSERT INTO public."Users" (username, password, age, height, weight) VALUES ("'+req.body.username+'","'+req.body.password+'",'+req.body.age+',160,'+req.body.weight+')';
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("Inserted new user" + req.username);
      db.end();
    }
  })
  res.render('profile', { user: req.body });
});

module.exports = router;
