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
}

// Display detail page for a specific Artist.
exports.song_detail = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Song detail: ' + req.params.id);
};

// Display Artist create form on GET.
exports.song_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Song create GET');
};

// Handle Artist create on POST.
exports.song_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Song create POST');
};

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