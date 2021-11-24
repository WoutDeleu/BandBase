//Require Mongoose
var mongoose = require('mongoose');

const {DateTime} = require("luxon");

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: {type: String, required: true, maxLength: 20},
    since: {type: Date},
    stillActive: {type: String, required: true, enum: ['Still Rocking', 'Stopped'], default: 'Still Rocking'},
});
//Virtual for the album name

ArtistSchema
    .virtual('Started')
    .get(function () {
        since_string = DateTime.fromJSDate(this.since).toLocaleString(DateTime.DATE_MED);
        return since_string;
    });

// Virtual for author's URL
ArtistSchema
    .virtual('url')
    .get(function () {
        return '/discover/artist' + this._id;
    });

//Export model
module.exports = mongoose.model('Artist', ArtistSchema);