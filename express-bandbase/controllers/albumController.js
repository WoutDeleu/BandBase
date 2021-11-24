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
    Artist.find()
        .sort([['title', 'ascending']])
        .exec(function(err, list_albums){
            if(err){return next(err);}
            res.render('album_list', {title:'Album List', album_list: list_albums});
        });
}

// Display detail page for a specific Album.
exports.album_detail = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Album detail');
};

// Display Album create form on GET.
exports.album_create_get = function(req, res, next) {
    async.parallel({
        artists: function (callback) {
            Artist.find(callback);
        },
    },function(err, results){
        if(err){return next(err); }
        res.render('album_form', {title: 'Create Album', albums: results.artists});
    })
};

// Handle Album create on POST.
exports.album_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Album create POST');
};

// Display Album delete form on GET.
exports.album_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Album delete GET');
};

// Handle Artist delete on POST.
exports.album_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Album delete POST');
};

// Display Artist update form on GET.
exports.album_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Album update GET');
};

// Handle Artist update on POST.
exports.album_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Album update POST');
};