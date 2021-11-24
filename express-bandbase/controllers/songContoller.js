var Song = require('../models/song');
var Artist = require('../models/artist');
var Album = require('../models/album');
const { body,validationResult } = require('express-validator');

var async = require('async');


// Display list of all Artists.
exports.song_list = function(req, res, next) {
    Song.find()
        .sort([['title','ascending']])
        .exec(function (err, list_song){
            if(err){return next(err); }
            res.render('song_list', {title: 'Song List', genre_list: list_song})
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
        
    })
};

// Display Artist create form on GET.
exports.song_create_get = function(req, res, next) {
    res.render('song_form', {title: 'Create Song '});
};

// Handle Song create on POST.
exports.song_create_post = function(req, res, next) {
    body('title', 'Song Title is required').trim().isLength({min: 1}).escape(), 
    body('data_of_release', 'Invalid date of release').optional({ checkFalsy: true }).isISO8601().toDate(),

        (req,res,next) => {
            const errors = validationResult(req);
            
            var song = new Song({
                title: req.body.title,
                data_of_release: req.body.date_of_release,
            });
            if (!errors.isEmpty()){
                res.render('song_form',{title: 'Create Song', song: req.body, errors: errors.array()});
                return;
            }
            else{
                Song.findOne({'title':req.body.title})
                    .exec(function (err, found_artist){
                        if(err) {return next(err);}

                        if(found_song){
                            res.redirect(found_song.url);
                        }
                        else{
                            song.save(function (err){
                                if(err){return next(err);}
                                res.redirect(song.url)
                            })
                        }
                    })
            }
            
        };    
}

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