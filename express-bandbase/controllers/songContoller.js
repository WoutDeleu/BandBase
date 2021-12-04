var Song = require('../models/song');
var Artist = require('../models/artist');
var Album = require('../models/album');
const { body,validationResult } = require('express-validator');

var async = require('async');
var luxon = require('luxon');


// Display list of all Artists.
exports.song_list = function(req, res, next) {
    Song.find()
        .sort([['title','ascending']])
        .exec(function (err, list_song){
            if(err){return next(err); }
            res.render('song_list', {title: 'Song List', song_list: list_song})
        });
};

// Display detail page for a specific Song.
exports.song_detail = function(req, res, next) {
    async.parallel({
        song: function (callback) {
            Song.findById(req.params.id)
                .populate('artist')
                .exec(callback);
        },
    },function (err, results){
        if (err) { return next(err); }
        if (results.song==null) { // No results.
            var err = new Error('Song not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('song_detail', { title: 'Song Detail', song: results.song } );
    });
};

// Display Song create form on GET.
exports.song_create_get = function(req, res, next) {

    async.parallel({
        artists: function (callback){
            Artist.find(callback);
        },
    },function (err,results){
        if(err){return next(err);}
        res.render('song_form', {title: 'Create Song ', artists: results.artists });
    });
};

// Handle Song create on POST.
exports.song_create_post = [

        body('title', 'Song Title is required').trim().isLength({min: 1}).escape(),
        body('data_of_release').optional({ checkFalsy: true }).isISO8601().toDate(),
        body('artist.*').escape(),


        (req,res,next) => {
            const errors = validationResult(req);

            var song = new Song({
                title: req.body.title,
                data_of_release: req.body.data_of_release,
                artist: req.body.artist,
                URL_videoclip: req.body.URL_videoclip
            });
            if (!errors.isEmpty()) {
                res.render('song_form', {title: 'Create Song', song: song, artists:results.artists, errors: errors.array()});
                return;
            }
            else{
                song.save(function (err){
                    if(err){return next(err);}
                    res.redirect(song.url);
                });
            }
        }
];

// Display Artist delete form on GET.
exports.song_delete_get = function(req, res, next) {
    async.parallel({
        song: function (callback) {
            Song.findById(req.params.id).exec(callback);
        },
    },function (err, results){
        if(err){return next(err);}
        res.render('song_delete',{title: 'Delete song', song: results.song})
    });
};

// Handle Artist delete on POST.
exports.song_delete_post = function(req, res, next) {
    async.parallel({
        song: function (callback) {
            Song.findById(req.params.id).exec(callback);
        },
    },function (err, results){
        if(err){return next(err);}
        else{
            Song.findByIdAndRemove(req.body.songid, function deleteSong(err){
                if(err){return next(err);}
                res.redirect('/discover/songs')
            });
        }
    });
};

// Display Artist update form on GET.
exports.song_update_get = function(req, res, next) {
    async.parallel({
        song: function (callback) {
            Song.findById(req.params.id).populate('artist').exec(callback);
        },
        artists: function (callback){
            Artist.find(callback);
        },
    },function (err,results){
        if(err){return next(err);}
        if(results.song == null){
            var err = new Error('Song not found');
            err.status = 404;
            return next(err);
        }
        res.render('song_form', { title: 'Update song ', song: results.song, artists: results.artists});
    })
};

// Handle Song update on POST.
exports.song_update_post = [
    // Validate and santize the name field.
        body('title', 'Song Title is required').trim().isLength({min: 1}).escape(),
        body('data_of_release').optional({ checkFalsy: true }).isISO8601().toDate(),
        body('artist.*').escape(),
        // Process request after validation and sanitization.
        (req, res, next) => {

            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            var song = new Song(
                {title: req.body.title,
                    data_of_release: req.body.data_of_release,
                    artist: req.body.artist,
                    URL_videoclip: req.body.URL_videoclip,
                    _id: req.params.id
                }
            );

            if (!errors.isEmpty()) {

                // There are errors. Render the form again with sanitized values/error messages.
                res.render('song_form', {title: 'Update song', song: song, errors: errors.array()});
                return;
            }
            else{
                Song.findByIdAndUpdate(req.params.id,song,{}, function (err,thesong){
                    if(err){return next(err);}
                    res.redirect(thesong.url);
                })
            }
        }
];