//initialize variables and requirements
var Twitter = require('twitter');
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var count = 0;
//retrieve the user input selection
var userInput = process.argv[2];

//if user input is my-tweets run the twitter information section
if(userInput === "my-tweets"){
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
   
  var user = "CoPilot78";
  var params = "";
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    	//loop through 20 tweets and display them.
      for (var i = 0; i < 20; i++) {
        tweets[i];
        console.log(tweets[i].text);
      }
      //console.log(JSON.stringify(response, null, 2));
      //if there is an error display it.
    }else{
    	console.log(error);
    }
  });
}else if(userInput === "spotify-this-song"){

  //start a function to create a recursive loop
  var songQuestion = function(){

    if(count < 1){
      inquirer.prompt([
        {
          name: "song",
          message: "What song are you looking for:"
        }]).then(function(answers) { 
          var userSong = answers.song;
          var spotify = new Spotify({
            id: keys.spotifyKeys.id,
            secret: keys.spotifyKeys.secret
          });
          spotify.search({ type: 'track', query: answers.song, limit: 1}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          var album = data.tracks.items[0].album.name;
          var artist = data.tracks.items[0].artists[0].name;
          var song = data.tracks.items[0].name;
          var url = data.tracks.items[0].preview_url;

          console.log('You selected the song ' + song + ' by the artist ' + artist + '\n' + 'This song is on the "' + album + '" album.' + '\nYou can find a preview to the song here: ' + '\n' + url);
          //console.log(JSON.stringify(data.tracks.items[0], null, 2)); 
          });
          count++;
          songQuestion();
        }); 
    }
  }
  songQuestion();
}