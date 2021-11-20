var Artist = require('../models/artist');
var Album = require('../models/artist');
var Genre = require('../models/genre');
var Song = require('../models/song');
const { body,validationResult } = require('express-validator');

var async = require('async');

// Display list of all Artists.
exports.artist_list = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Artist list');
}

// Display detail page for a specific Artist.
exports.artist_detail = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Album detail: ' + req.params.id);
};

// Display Artist create form on GET.
exports.artist_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Artist create GET');
};

// Handle Artist create on POST.
exports.artist_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Artist create POST');
};

// Display Artist delete form on GET.
exports.artist_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Artist delete GET');
};

// Handle Artist delete on POST.
exports.artist_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Artist delete POST');
};

// Display Artist update form on GET.
exports.artist_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Artist update GET');
};

// Handle Artist update on POST.
exports.artist_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Artist update POST');
};