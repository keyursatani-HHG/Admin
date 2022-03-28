var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Wel come to Node in user Js server' });
});

module.exports = router;
