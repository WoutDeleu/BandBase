var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('cookiePolicy', {title: 'Cookie Policy - Band Base' });
});

module.exports = router;