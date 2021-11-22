var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: {type: String, required: true, maxLength: 20},
    since: {type: Date},
    stillActive: {type: String, required: true, enum: ['Still Rocking', 'Stopped'], default: 'Still Rocking'},
});
//Virtual for the album name
ArtistSchema
    .virtual('album')
    .get(function () {
        return this.title;
    });

//Virtual for the release
ArtistSchema
    .virtual('release')
    .get(function () {
        var releaseDate = '';
        if (this.date_of_release){
            releaseDate = DateTime.fromJSDate()(this.date_of_release).toLocaleString(DateTime.DATE_MED);
        }
    });

ArtistSchema
    .virtual('artist')
    .get(function () {
        return this.title;
    });

// Virtual for author's URL
ArtistSchema
    .virtual('url')
    .get(function () {
        return '/bandCatalog/album'+this._id;
    });


//Export model
module.exports = mongoose.model('Artist', ArtistSchema);