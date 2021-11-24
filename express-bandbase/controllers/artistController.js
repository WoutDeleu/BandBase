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
        .exec(function(err, list_artists){
            if(err){return next(err);}
            res.render('artist_list', {title:'Artist List', artist_list: list_artists});
    });
}

// Display detail page for a specific Artist.
exports.artist_detail = function(req, res, next) {

    async.parallel({
        artist: function(callback) {
            Artist.findById(req.params.id)
                .exec(callback)
        },

        artists_album: function (callback){
            Album.find({ 'artist': req.params.id}, 'Testing')
                .exec(callback);
        },

    }, function (err,results){
        if (err){return next(err); }
        if (results.artist==null){
            var err = new Error('Artist not found');
            err.status = 404;
            return next(err);
        }
        //Succesful, so render
        res.render('artist_detail', {title: 'Artist Detail', artist: results.artist, artist_list: results.artists_album});
    });
};

// Display Artist create form on GET.
exports.artist_create_get = function(req, res, next) {

    async.parallel({
        albums: function (callback) {
            Album.find(callback);
        },
    },function(err, results){
        if(err){return next(err); }
        res.render('artist_form', {title: 'Create artist', albums: results.albums});
    })
    
};

// Handle Artist create on POST.
exports.artist_create_post = [

    body('name').trim().isLength({min: 1}).escape().withMessage('Band name must be specified'),
    body('since', 'Invalid date of origin').optional({checkFalsy: true}).isISO8601().toDate(),
    body('stillActive').escape,

        // Process request after validation and sanitization
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('artist_form', {title: 'Create Artist', artist: req.body, errors: errors.array()});
            return;



        } else {

            var artist = new Artist(
                {
                    name: req.body.name,
                    since: req.body.since,
                    stillActive: req.body.stillActive
                }
            );

            Artist.findOne({'name': req.body.name})
                .exec(function (err, found_artist) {
                    if (err) {
                        return next(err);
                    }

                    if (found_artist) {
                        res.redirect(found_artist.url);
                    } else {
                        artist.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            //Artist saved redirect to genre detail page
                            res.redirect(artist.url);
                        });

                    }

                });
            var artist = new Artist(
                {
                    name: req.body.name,
                    since: req.body.since,
                    stillActive: req.body.stillActive
                });
            artist.save(function (err){
                if (err){return next(err); }
                res.redirect(author.url);

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