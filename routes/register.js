var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
const registerControllers = require('../controllers/register.js');

router.get('/', registerControllers.register);

router.post('/registerprocess', urlencodedParser, function (req, res) {
  res.render('profile', { user: req.body });
});

module.exports = router;
