var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about', {title: 'AboutUs - Band Base' });
});

module.exports = router;