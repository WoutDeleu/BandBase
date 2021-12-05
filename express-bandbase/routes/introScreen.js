var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//global.document = new JSDOM(pug).window.document;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('introScreen', {title: 'Intro Screen - Band Base' });
});






module.exports = router;