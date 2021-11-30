var mongoose = require('mongoose');
const {DateTime} = require("luxon");
const url = require("url");

var Schema = mongoose.Schema;

var SongSchema = new Schema({
    title: {type: String, required: true, maxLength: 20},
    URL_videoclip: {type: String, required: false,},
    data_of_release: {type: Date},
    artist: {type: Schema.Types.ObjectId, ref: 'Artist', required: true},
    album: {type: Schema.Types.ObjectID, ref: 'Album'}
});

//Virtual for the release
SongSchema
    .virtual('releaseDate')
    .get(function () {
        releaseDate = DateTime.fromJSDate(this.data_of_release).toLocaleString(DateTime.DATE_MED);
        return releaseDate;
    });

// Virtual for author's URL
SongSchema
    .virtual('url')
    .get(function () {
        return '/discover/song/' + this._id;
    });

SongSchema
    .virtual('videoURL')
    .get(function (){
        var url = song.URL_videoclip
        var urlSplit = url.split("/");
        var sauce = urlSplit[urlSplit.length - 1].split("=")[1]
        var defUrl = "http://www.youtube.com/embed/" + sauce

    })

/*

var Artists = mongoose.model()
//Virtural for artist
SongSchema
    .virtual('artistDB')
    .get(function (key) {
        var query = { artistID: key }
        return SongSchema.find(query);
});*/



//Export model
module.exports = mongoose.model('Song', SongSchema);