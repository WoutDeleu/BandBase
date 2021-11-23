var express = require('express');
var router = express.Router();

// Require controller modules.
var album_controller = require('../controllers/albumController');
var artist_controller = require('../controllers/artistController');
var genre_controller = require('../controllers/genreController');
var song_controller = require('../controllers/songContoller');

///ALBUM ROUTES///

//GET Band cataloge home
router.get('/', album_controller.index)

// GET request for creating a Band. NOTE This must come before routes that display Book (uses id).
router.get('/album/create', album_controller.album_create_get);

// POST request for creating Band.
router.post('/album/create', album_controller.album_create_post);

// GET request to delete Band.
router.get('/album/:id/delete', album_controller.album_delete_get);

// POST request to delete Band.
router.post('/album/:id/delete', album_controller.album_delete_post);

// GET request to update Band.
router.get('/album/:id/update', album_controller.album_update_get);

// POST request to update Band.
router.post('/album/:id/update', album_controller.album_update_post);

// GET request for one Band.
router.get('/album/:id', album_controller.album_detail);

// GET request for list of all Band items.
router.get('/albums', album_controller.album_list);

/// AUTHOR ROUTES ///

// GET request for creating Artist. NOTE This must come before route for id (i.e. display author).
router.get('artist', artist_controller.artist_create_get);

// POST request for creating Artist.
router.post('/artist/create', artist_controller.artist_create_post);

// GET request to delete Artist.
router.get('/artist/:id/delete', artist_controller.artist_delete_get);

// POST request to delete Artist.
router.post('/artist/:id/delete', artist_controller.artist_delete_post);

// GET request to update Artist.
router.get('/artist/:id/update', artist_controller.artist_update_get);

// POST request to update Artist.
router.post('/artist/:id/update', artist_controller.artist_update_post);

// GET request for one Artist.
router.get('/artist/:id', artist_controller.artist_detail);

// GET request for list of all Artists.
router.get('/artists', artist_controller.artist_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

/// SONG ROUTES ///

// GET request for creating a Song. NOTE This must come before route that displays BookInstance (uses id).
router.get('/song/create', song_controller.song_create_get);

// POST request for creating Song.
router.post('/song/create', song_controller.song_create_post);

// GET request to delete Song.
router.get('/song/:id/delete', song_controller.song_delete_get);

// POST request to delete Song.
router.post('/song/:id/delete', song_controller.song_delete_post);

// GET request to update BookInstance.
router.get('/song/:id/update', song_controller.song_update_get);

// POST request to update BookInstance.
router.post('/song/:id/update', song_controller.song_update_post);

// GET request for one BookInstance.
router.get('/song/:id', song_controller.song_detail);

// GET request for list of all BookInstance.
router.get('/song', song_controller.song_list);

module.exports = router;