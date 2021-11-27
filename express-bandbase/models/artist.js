//Require Mongoose
var mongoose = require('mongoose');

const {DateTime} = require("luxon");

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: {type: String, required: true,minlength: 3, maxLength: 30},
    since: {type: Date, required: true},
    stillActive: {type: String, required: true, enum: ['StillRocking', 'Stopped'], default: 'Still_Rocking'},
})
ArtistSchema
    .virtual('url')
    .get(function (){
        return '/discover/artist/' + this._id;
    });

ArtistSchema
    .virtual('started')
    .get(function () {
        since_string = DateTime.fromJSDate(this.since).toLocaleString(DateTime.DATE_MED);
        return since_string;
    });

// Virtual for author's URL


//Export model
module.exports = mongoose.model('Artist', ArtistSchema);