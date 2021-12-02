var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');
var Genre = require('../models/genre');
const { body,validationResult } = require('express-validator');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        artist_count: function(callback) {
            Artist.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        album_count: function(callback) {
            Album.countDocuments({}, callback);
        },
        song_count: function(callback) {
            Song.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        },
        
    }, function(err, results) {
        res.render('discover', { title: 'Local Bands Home', error: err, data: results });
    });
};

// Display list of all Artists.
exports.album_list = function(req, res, next) {
    Album.find()
        .sort([['title', 'ascending']])
        .exec(function(err, list_albums){
            if(err){return next(err);}
            res.render('album_list', {title:'Album List', album_list: list_albums});
        });
}

// Display detail page for a specific Album.
exports.album_detail = function(req, res, next) {
    async.parallel({
        album: function (callback) {
            Album.findById(req.params.id)
                .populate('artist')
                .populate('song')
                .populate('genre')
                .exec(callback);
        },
        album_songs:function(callback){
            Song.find({'album': req.params.id})
                .exec(callback);
        },
    },function (err, results){
        if (err) { return next(err); }
        if (results.album==null) { // No results.
            var err = new Error('Album not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('album_detail', { title: 'Album Detail', album: results.album, album_songs: results.album_songs} );
    });
};

// Display Album create form on GET.
exports.album_create_get = function(req, res, next) {

    async.parallel({
        artists:function (callback){
            Artist.find(callback);
        },
        genres:function(callback){
            Genre.find(callback);
        },
        songs:function (callback){
            Song.find(callback)
        },
    },function (err,results){
        if(err){return next(err);}
        res.render('album1_form',{title:'Create Album', artists: results.artists, genres: results.genres, songs:results.songs});
    });
}

// Handle Album create on POST.
exports.album_create_post = [

    (req, res, next) => {
        if(!(req.body.song instanceof Array)){
            if(typeof req.body.song ==='undefined')
                req.body.song = [];
            else
                req.body.song = new Array(req.body.song);
        }
        next();
    },

    body('title', 'Album name required').trim().isLength({min: 1}).escape(),
    body('data_of_release').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('artist.*').escape(),
    body('genre.*').escape(),
    body('song.*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        var album = new Album(
            {title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            date_of_release: req.body.date_of_release,
            song: req.body.song
            }
        );
        if (!errors.isEmpty()){
            async.parallel({
                artists: function (callback){
                    Artist.find(callback);
                },
                genres: function (callback){
                    Genre.find(callback);
                },
                songs: function (callback){
                    Song.find(callback);
                }
            }, function (err,results){
                if(err){return next(err);}

                for (let i = 0; i < results.songs.length; i++) {
                    if (album.song.indexOf(results.songs[i]._id) > -1) {
                        results.songs[i].checked='true';
                    }
                }
                res.render('album1_form', {title: 'Create Album', album: album,artists: results.artists,genres: results.genres, errors: errors.array()});
            });
            return;
        }
        else {
            Album.findOne({'title': req.body.title})
                .exec(function (err, found_album) {
                    if (err) {
                        return next(err);
                    }

                    if (found_album) {
                        res.redirect(found_album.url);
                    } else {
                        album.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.redirect(album.url);
                        })
                    }
                })
        }
    }
];

// Display Album delete form on GET.
exports.album_delete_get = function(req, res, next) {
    async.parallel({
        album: function (callback) {
            Album.findById(req.params.id).exec(callback);
        },
        album_songs: function(callback) {
            Song.find({ 'album': req.params.id })
                .exec(callback);
        },
    },function (err, results){
        if(err){return next(err);}
        res.render('album_delete',{title: 'Delete Song', album: results.album, album_songs: results.album_songs})
    });
};

// Handle Album delete on POST.
exports.album_delete_post = function(req, res, next) {
    async.parallel({
        album: function (callback) {
            Album.findById(req.params.albumid).exec(callback);
        },
        album_songs: function(callback) {
            Song.find({ 'album': req.params.id })
                .exec(callback);
        },
    },function (err, results){
        if(err){return next(err);}
        if (results.album_songs.length > 0) {
            // Author has books. Render in same way as for GET route.
            res.render('album_delete', { title: 'Delete Album', album: results.album, album_songs: results.album_songs} );
            return;
        }
        else{
            Album.findByIdAndRemove(req.body.albumid, function deleteAlbum(err){
                if(err){return next(err);}
                res.redirect('/discover/albums')
            });
        }
    });
};

// Display Artist update form on GET.
exports.album_update_get = function(req, res, next) {
    async.parallel({
        album: function (callback){
            Album.findById(req.params.id).populate('artist').populate('genre').populate('song').exec(callback);
        },
        artists:function (callback){
            Artist.find(callback);
        },
        genres:function(callback){
            Genre.find(callback);
        },
        songs:function (callback){
            Song.find(callback)
        },
    },function (err,results){
        if(err){return next(err);}
        if (results.album==null) { // No results.
            var err = new Error('Album not found!');
            err.status = 404;
            return next(err);
        }
        for (var all_g_iter = 0; all_g_iter < results.songs.length; all_g_iter++) {
            for (var album_s_iter = 0; album_s_iter < results.album.song.length; album_s_iter++) {
                if (results.songs[all_g_iter]._id.toString()===results.album.song[album_s_iter]._id.toString()) {
                    results.songs[all_g_iter].checked='true';
                }
            }
        }
        res.render('album1_form',{title:'Create Album', artists: results.artists, genres: results.genres, songs:results.songs, album: results.album});
    });
};

// Handle Album update on POST.
exports.album_update_post = [
    (req, res, next) => {
        if(!(req.body.song instanceof Array)){
            if(typeof req.body.song ==='undefined')
                req.body.song = [];
            else
                req.body.song = new Array(req.body.song);
        }
        next();
    },

    body('title', 'Album name required').trim().isLength({min: 1}).escape(),
    body('data_of_release').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('artist.*').escape(),
    body('genre.*').escape(),
    body('song.*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        var album = new Album(
            {title: req.body.title,
                artist: req.body.artist,
                genre: req.body.genre,
                date_of_release: req.body.date_of_release,
                song: req.body.song,
                _id: req.params.id
            });
        if (!errors.isEmpty()){
            async.parallel({
                artists: function (callback){
                    Artist.find(callback);
                },
                genres: function (callback){
                    Genre.find(callback);
                },
                songs: function (callback){
                    Song.find(callback);
                }
            }, function (err,results){
                if(err){return next(err);}

                for (let i = 0; i < results.songs.length; i++) {
                    if (album.song.indexOf(results.songs[i]._id) > -1) {
                        results.songs[i].checked='true';
                    }
                }
                res.render('album1_form', {title: 'Create Album', album: album,artists: results.artists,genres: results.genres, errors: errors.array()});
            });
            return;
        }
        else{
            Album.findByIdAndUpdate(req.params.id, album,{},function (err,thealbum){
              if(err){return next(err);}
              res.redirect(thealbum.url);
            });
        }
    }
    
];