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

// Display Artist create form on GET.
exports.song_create_get = function(req, res, next) {
    Artist.find({},'title')
        .exec(function (err, artists) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('song_form', {title: 'Create Song ', artists: artists});
        });
    
};

// Handle Song create on POST.
exports.song_create_post = [

        body('title', 'Song Title is required').trim().isLength({min: 1}).escape(),
        body('data_of_release', 'Invalid date of release').optional({ checkFalsy: true }).isISO8601().toDate(),
        body('artist.*').escape(),

        (req,res,next) => {
            const errors = validationResult(req);

            var song = new Song({
                title: req.body.title,
                data_of_release: req.body.data_of_release,
                artist: req.body.artist
            });
            if (!errors.isEmpty()){
                res.render('song_form', {title: 'Create Song', song: song, artists:results.artists,errors: errors.array()});
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
    res.send('NOT IMPLEMENTED: Song delete GET');
};

// Handle Artist delete on POST.
exports.song_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Song delete POST');
};

// Display Artist update form on GET.
exports.song_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Song update GET');
};

// Handle Artist update on POST.
exports.song_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Song update POST');
};