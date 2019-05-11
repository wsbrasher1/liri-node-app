
require("dotenv").config();

//Created a variable to gain access to the keys.js file which includes the API key information for Spotify
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

    spotify.search({type: 'track', query: songName}, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
//To add a line break when search results are listed//
    console.log("----------------------------");
//To return artist information//
console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
//To return the song name//
console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
//To return a preview link of the song from Spotify//
console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
//To return the Album information for the song//
console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
//To append the search results to log.txt file//
var logSongData = "\n******Begin Spotify Log Entry******" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\n Preview Link: " + data.tracks.items[0].href + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n******End Spotify Log Entry******";

fs.appendFile("log.txt", logSongData, function(error) {
    if (error) {
        return console.log(error);
    }
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
        console.log("Location: " + response.data[0].venue.city + "\r\n");
        console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YY") + "\r\n");
//To append the search results to log.txt file//
    var logConcertData = "\n******Begin Concert Log Entry******" + "\nName of the Artist: " + artist + "\nName of venue: " + response.data[0].venue.name + "\n Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n******End Concert Log Entry******";

        fs.appendFile("log.txt", logConcertData, function (error){
            if (error) {
                return console.log(error);
            }
        });
    });
};

//Function to search OMDB API //

function getOMDB(movie) {
//If the user doesn't input a movie title then the program will provide data for "Mr. Nobody"//

    if(!movie) {
        movie = "Mr. Nobody";
    }

    var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieQueryURL).then(
        function(response){
            //To log the data from response//
            console.log("----------------------------");
            console.log("* Title: " + response.data.Title + "\r\n");
            console.log("* Year Released: " + response.data.Year + "\r\n");
            console.log("* IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].value + "\r\n");
            console.log("* Country Where Movie Produced: " + response.data.Country + "\r\n");
            console.log("* Language: " + response.data.Language + "\r\n");
            console.log("* Plot: " + response.data.Plot + "\r\n");
            console.log("* Actors: " + response.data.Actors + "\r\n");

            //To log the results of the movie search//
            var logMovieData = "\n******Begin Movie Log Entry******" + "\nMovie Title: " + response.data.Title + "\nYear released: " + response.data.Year + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n******End Movie Log Entry******";

            fs.appendFile("log.txt", logMovieData, function (error) {
                if(error){
                    return console.log(error);
                } 
            });     
        });
};

//Function which uses the fs node package to get data from random.txt file//
function getRandom() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            } else {
                console.log(data);

                var randomData = data.split(",");
                liriGo(randomData[0], randomData[1]);
            }
        });        
};

//Function to log results data//
function logResults(data) {
        fs.appendFile("log.txt", data, function (error){
            if(error){
                return console.log(error);
            }
        });
};

liriGo(appCommand, liriSearch);