var mongoose = require('mongoose');
const {DateTime} = require("luxon");


var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    title: {type: String, required: true, maxLength: 20},
    artist: {type: Schema.Types.ObjectId, ref: 'Artist', required: true},
    genre: {type: Schema.Types.ObjectId, ref: 'Genre', required: true},
    date_of_release: {type: Date,required: true},

});
//Virtual for the album name
AlbumSchema
    .virtual('album')
    .get(function () {
        return this.title;
    });

//Virtual for the release
AlbumSchema.virtual('release').get(function () {
        var releaseDate = '';
        if (this.date_of_release){
            releaseDate = DateTime.fromJSDate()(this.date_of_release).toLocaleString(DateTime.DATE_MED);
        }
        return releaseDate;
    });

AlbumSchema
    .virtual('album')
    .get(function () {
        return this.title;
    });

// Virtual for author's URL
AlbumSchema
    .virtual('url')
    .get(function () {
        return '/discover/album'+this._id;
    });


//Export model
module.exports = mongoose.model('Album', AlbumSchema);