var mongoose = require('mongoose');
const {DateTime} = require("luxon");

var Schema = mongoose.Schema;

var SongSchema = new Schema({
    name: {type: String, required: true, maxLength: 20},
    data_of_release: {type: Date},
});
//Virtual for the album name
SongSchema
    .virtual('Song')
    .get(function () {
        return this.title;
    });

//Virtual for the release
SongSchema
    .virtual('release')
    .get(function () {
        var releaseDate = '';
        if (this.date_of_release){
            releaseDate = DateTime.fromJSDate()(this.date_of_release).toLocaleString(DateTime.DATE_MED);
        }
    });

SongSchema
    .virtual('song')
    .get(function () {
        return this.title;
    });

// Virtual for author's URL
SongSchema
    .virtual('url')
    .get(function () {
        return '/bandCatalog/song'+this._id;
    });


//Export model
module.exports = mongoose.model('Song', SongSchema);