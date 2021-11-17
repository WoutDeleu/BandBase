var express = require('express');
var router = express.Router();

// Require controller modules.
var album_controller = require('../controllers/albumController');
var artist_controller = require('../controllers/artistController');
var genre_controller = require('../controllers/genreController');
var song_controller = require('../controllers/songContoller');

///ALBUM ROUTES///

//GET band cataloge home
router.get('/', album_controller.index)

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', album_controller.);