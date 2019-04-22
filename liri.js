require("dotenv").config();

let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let axios = require('axios');
let inquire = require('inquirer');
let moment = require('moment');

const argChecker = () => {
  var noCommand = process.argv.length === 2
  var noArgs = process.argv.length === 3
  return noCommand || noArgs
}

movieThis = () => {
  var movie = process.argv.slice(3).join(" ");
  console.log(process.argv)
  console.log(movie);
  if (argChecker())  {
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Produced in: " + response.data.Country);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      }
    );

  } else {

    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Produced in: " + response.data.Country);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      }
    );
  }
}

concertThis = () => {
let artist = process.argv.slice(3).join(" ");
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response){


    console.log("Venue Name: " + response.data[0].venue.name);
    console.log("Venue City: " + response.data[0].venue.city);
    console.log("Event Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY, h:mm a'));
  }
 )
}

spotifyThisSong = () => {
let song = process.argv.slice(3).join(" ");
spotify
.search({type: 'track', query: song, limit: 1})
.then(function(response){
   console.log(response.tracks.items[0]);
 })
}

if (process.argv[2] === "movie-this"){
  movieThis()
} else if (process.argv[2] === "concert-this"){
  concertThis()
} else if (process.argv[2] === "spotify-this-song") {
 spotifyThisSong()
}
