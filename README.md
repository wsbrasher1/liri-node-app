# LIRI-Node-App
LIRI - A command line node application that takes in parameters such as songs, bands and movie information and provides relevant data
pertaining to your search.

This application utilizes calls to the OMDB (Movies), Bands In Town (Concerts) and Spotify (Music) APIs to provide information
based on the user search requests.

LIRI stands for "Language Interpretation and Recognition Interface".

## Built With
LIRI was built using Javascript and incorporates the following packages:
*Node-Spotify-API - for song and artist information
*Axios - to secure data from the OMDB and Bands In Town APIs
*Moment.js - for date related information


## How To Run
To run this application via a command line application (ex. Terminal) you will need to use the following commands to search 
for the desired data:
'movie-this', 'spotify-this-song', 'concert-this', and 'do-what-it-says'.

## Deployment
If you would like to run this application, you may clone this repo but please note that you will have to include your own .env
file which would include your own unique Spotify ID and Secret. Your .env file format content should look like the example below but
with your unique spotify information entered.

---------------------------------------------------
# Spotify API keys

SPOTIFY_ID="replace your Spotify ID"

SPOTIFY_SECRET="replace with your Spotify Secret"

---------------------------------------------------



## Demo
Here is a link to a video demonstration that further explains the application and walks you through its functionality:



