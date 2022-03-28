var express = require('express');
var router = express.Router();
var hello = require('../Models/image');
const multer = require('multer')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Wel come to Node in index Js server' });
});


module.exports = router;
