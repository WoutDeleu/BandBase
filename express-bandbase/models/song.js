var mongoose = require('mongoose');
const {DateTime} = require("luxon");
const url = require("url");

var Schema = mongoose.Schema;

var SongSchema = new Schema({
    title: {type: String, required: true, maxLength: 20},
    URL_videoclip: {type: String, required: false,},
    data_of_release: {type: Date, required: true},
    artist: {type: Schema.Types.ObjectId, ref: 'Artist', required: true},
});

//Virtual for the release
SongSchema
    .virtual('releaseDate').get(function () {
    var releaseDate = '';
    if (this.data_of_release){
        releaseDate = DateTime.fromJSDate(this.data_of_release).toLocaleString(DateTime.DATE_MED);
    }
    return releaseDate;
});

// Virtual for author's URL
SongSchema
    .virtual('url')
    .get(function () {
        return '/discover/song/' + this._id;
    });

//Export model
module.exports = mongoose.model('Song', SongSchema);