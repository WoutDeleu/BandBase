var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    title: {type: String, required: true, maxLength: 20},
    artist: {type: String, required: true, maxLength: 20},
    date_of_release: {type: Date},
});
//Virtual for the album name
AlbumSchema
    .virtual('title')
    .get(function () {
        return this.title;
    });

//Virtual for the release
AlbumSchema
    .virtual('release')
    .get(function () {
        var releaseDate = '';
        if (this.date_of_release){
            releaseDate = DateTime.fromJSDate()(this.date_of_release).toLocaleString(DateTime.DATE_MED);
        }
    });

AlbumSchema
    .virtual('title')
    .get(function () {
        return this.title;
    });

// Virtual for author's URL
AlbumSchema
    .virtual('url')
    .get(function () {
        return '/bandCatalog/album'+this._id;
    });


//Export model
module.exports = mongoose.model('Album', AlbumSchema);