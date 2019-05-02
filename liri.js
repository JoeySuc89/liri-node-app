require("dotenv").config();

let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let axios = require('axios');
let inquire = require('inquirer');
let moment = require('moment');
let fs = require("fs");
let skipArgCheck = false

const argChecker = () => {
  if(skipArgCheck) return false
  var noCommand = process.argv.length === 2
  var noArgs = process.argv.length === 3
  return noCommand || noArgs
}

movieThis = (arg) => {
  if (argChecker())  {
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("=====================================================");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Produced in: " + response.data.Country);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("=====================================================");
      }
    );

  } else {
    var movie = arg;
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("=====================================================");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Produced in: " + response.data.Country);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("=====================================================");
      }
    );
  }
}

concertThis = (arg) => {
let artist = arg;
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response){

    let limit = response.data.length > 10 ? 10 : response.data.length;

 for( var i = 0; i < limit; i++){

    console.log("=====================================================");
    console.log("Venue Name: " + response.data[i].venue.name);
    console.log("Venue City: " + response.data[i].venue.city);
    console.log("Event Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY, h:mm a'));
    console.log("=====================================================");

   }
  }
 )
}

spotifyThisSong = (arg) => {
  if (argChecker()) {
    let song = "The Sign";
    let artist = "Ace of Base"
    spotify
    .search({type:'track', query: song, limit: 1})
    .then(function(response){
       console.log("=====================================================");
       console.log("Artists Name: " + response.tracks.items[0].artists[0].name);
       console.log("The Song's Name: " + response.tracks.items[0].name);
       console.log("Preview URL: " + response.tracks.items[0].preview_url);
       console.log("Album: " + response.tracks.items[0].album.name);
       console.log("=====================================================");
     })
  } else {
    let song = arg;
    spotify
    .search({type: 'track', query: song, limit: 1})
    .then(function(response){
       console.log("=====================================================");
       console.log("Artists Name: " + response.tracks.items[0].artists[0].name);
       console.log("The Song's Name: " + response.tracks.items[0].name);
       console.log("Preview URL: " + response.tracks.items[0].preview_url);
       console.log("Album: " + response.tracks.items[0].album.name);
       console.log("=====================================================");
     })
   }
 }

doWhatItSays = () => {
  skipArgCheck = true
  var data = fs.readFileSync("random.txt", "utf8");
  data = data.replace('\r\n', '').split(", ");
  randomNumber = Math.floor(Math.random() * data.length);
  var randomArgs = data[randomNumber]
  randomArgs = randomArgs.split(' "')
  var arg1 = randomArgs[0]
  var arg2 = randomArgs[1].replace('"', '')
  console.log(arg1, arg2)
  mainProcess(arg1, arg2);
}


mainProcess = (arg1, arg2) => {
  if (arg1 === "movie-this"){
    movieThis(arg2);
  } else if (arg1 === "concert-this"){
    concertThis(arg2);
  } else if (arg1 === "spotify-this-song") {
   spotifyThisSong(arg2);
   } else if (arg1 === "do-what-it-says") {
    doWhatItSays();
  }
}

mainProcess(process.argv[2], process.argv.slice(3).join(" "))
