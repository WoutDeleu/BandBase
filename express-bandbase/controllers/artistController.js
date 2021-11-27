var Artist = require('../models/artist');
var Album = require('../models/album');
var Genre = require('../models/genre');
var Song = require('../models/song');
const { body,validationResult } = require('express-validator');

var async = require('async');

// Display list of all Artists.
exports.artist_list = function(req, res, next) {
    Artist.find()
        .sort([['name', 'ascending']])
        .exec(function(err, list_artist){
            if(err){return next(err);}
            res.render('artist_list', {title:'Artist List', artist_list: list_artist});
    });
}

// Display detail page for a specific Artist.
exports.artist_detail = function(req, res, next) {

    async.parallel({
        artist: function (callback) {
            Artist.findById(req.params.id)
                .exec(callback);
        },
        artist_albums: function (callback) {
            Album.find({'artist': req.params.id})
                .exec(callback);
        },
    }, function (err,results){
        if(err){return next(err); }
        if(results.artist==null){
            var err = new Error('Artist not found');
            err.status = 404;
            return next(err);
        }
        res.render('artist_detail', {title :'Artist Detail', artist: results.artist, artist_albums: results.artist_albums});
    });
}

// Display Artist create form on GET.
exports.artist_create_get = function(req, res, next) {
        res.render('artist_form', {title: 'Create artist'});
};

// Handle Artist create on POST.
exports.artist_create_post = [

        body('name', 'Artist name required').trim().isLength({min: 1}).escape(),
        body('since').optional({checkFalsy: true}).isISO8601().toDate(),
        body('stillActive'),

        // Process request after validation and sanitization
        (req, res, next) => {

            const errors = validationResult(req);

            var artist = new Artist(
                {
                    name: req.body.name,
                    since: req.body.since,
                    stillActive: req.body.stillActive,
                }
            );

            if (!errors.isEmpty()) {
                res.render('artist_form', {title: 'Create Artist', artist: artist, errors: errors.array()});
                return;

            }
            else {
                // Data from form is valid.
                // Check if Artist with same name already exists.
                Artist.findOne({ 'name': req.body.name })
                    .exec( function(err, found_artist) {
                        if (err) { return next(err); }

                        if (found_artist) {
                            // Genre exists, redirect to its detail page.
                            res.redirect(found_artist.url);
                        }
                        else {

                            artist.save(function (err) {
                                if (err) { return next(err); }
                                // Artist saved. Redirect to artist detail page.
                                res.redirect(artist.url);
                            });

                        }

                    });


            }
        }
];

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