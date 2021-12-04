var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('introScreen', {title: 'Intro Screen - Band Base' });
});

//AJAX
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', "/randomBandImages/1240.jpg");
ourRequest.onload = function() {

};

module.exports = router;