
require("dotenv").config();

//Creates a variable to gain access to the keys.js file which includes the API key information for Spotify
//Also created additional variables below for the needed packages 
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//Created a variable for arguments that will be submitted by the user in the Liri application

var appCommand = process.argv[2];
console.log("appCommand: " + appCommand);

var liriSearch = process.argv.slice(3).join(" ");
console.log("liriSearch: " + liriSearch);

//Utilizing a switch statement to run the appropriate code for the user inputted app command

function liriGo(appCommand, liriSearch) {
    switch (appCommand) {
        case "spotify-this-song":
        getSpotify(liriSearch);
        break;

        case "concert-this":
        getBandsInTown(liriSearch);
        break;

        case "movie-this":
        getOMDB(liriSearch);
        break;

        case "do-what-it-says":
        getRandom();
        break;

    }

};

//Function to search Spotify API //
function getSpotify(songName) {
    var spotify = new Spotify(keys.spotify);
    console.log("Spotify key: " + spotify);

    if (!songName) {
        songName = "The Sign";
    };
    console.log("SongName if there is no song name: " + songName);

    spotify.search({type: 'track', query: songName}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
//To add a line break when search results are listed//
    console.log("----------------------------");
//To return artist information//
console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
//To return the song name//
console.log("Song Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
//To return a preview link of the song from Spotify//
console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
//To return the Album information for the song//
console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
//To append the search results to log.txt file//
var logSongData = "******Begin Spotify Log Entry******" + "\nArtist: " + data.tracks.items[0].album.artists[0].name;

fs.appendFile("log.txt", logSongData, function(err) {
    if (err) throw err;
    });

    });
};

//Function to search Bands in Town API//
function getBandsInTown(artist) {

    var artist = liriSearch;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(bandQueryURL).then(function (response){
        //To add a line break when search results are listed//
        console.log("----------------------------");
        //To console log the response given//
        console.log("Name of venue: " + response.data[0].venue.name + "\r\n");
        console.log("Location: " + response.data[0]venue.city + "\r\n");
        console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YY") + "\r\n");

        fs.appendFile("log.txt", logConcert, function (err){
            if (err) throw err;
        });
    });
};

//Function to search OMDB API //

