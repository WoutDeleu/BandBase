var mongoose = require('mongoose');
const {DateTime} = require("luxon");

var Schema = mongoose.Schema;

var SongSchema = new Schema({
    title: {type: String, required: true, maxLength: 20},
    data_of_release: {type: Date},
    artist: {type: Schema.Types.ObjectId, ref: 'Artist', required: true},
});

//Virtual for the release
SongSchema
    .virtual('release')
    .get(function () {
        releaseDate = DateTime.fromJSDate()(this.date_of_release).toLocaleString(DateTime.DATE_MED);
        return releaseDate;
    });

// Virtual for author's URL
SongSchema
    .virtual('url')
    .get(function () {
        return '/discover/song' + this._id;
    });


//Export model
module.exports = mongoose.model('Song', SongSchema);