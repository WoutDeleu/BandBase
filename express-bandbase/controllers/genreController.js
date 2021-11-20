var Genre = require('../models/genre');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
const { body,validationResult } = require('express-validator');

var async = require('async');

// Display list of all Artists.
exports.genre_list = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre list');
}

// Display detail page for a specific Artist.
exports.genre_detail = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Artist create form on GET.
exports.genre_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Artist create on POST.
exports.genre_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Artist delete form on GET.
exports.genre_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Artist delete on POST.
exports.genre_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Artist update form on GET.
exports.genre_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Artist update on POST.
exports.genre_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};