var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('introScreen', { title: 'Introscreen - Band Base' });
});

module.exports = router;