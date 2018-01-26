const dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
const keys = require("./keys.js");
var fs = require("fs");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);


var omdbKey = keys.omdb.api_key;
//console.log("omdbKey: ", omdbKey);

const dataArr1 = process.argv.slice(2);
//console.log("dataArr1: ", dataArr1);



if (dataArr1[0] == 'my-tweets') {
	
	getTweets(); 

}

if (dataArr1[0] == 'spotify-this-song') {
	if (dataArr1[1]) {
		console.log("requested song info ")
		getSong(dataArr1[1]); 
	} else {
		console.log("requested song info ")
		getSong("The sign"); // check the syntax for calling getSong with the default song "The Sign"
	}
}

if (dataArr1[0] == 'movie-this') {

	if (dataArr1[1]) {
		console.log("************requested movie info is given below************");
		getMovie(dataArr1[1]); // check the syntax for calling getMovie with the content of dataArra1[1]
	} else {
		console.log("************requested movie info is given below************");
		getMovie("Mr. Nobody"); // check the syntax for calling getMovie with the default movie "Mr. Nobody"
	}

}

if (dataArr1[0] == 'do-what-it-says') {

	fs.readFile("random.txt", "utf8", function(error, data) { // put in random.txt spotify-this-song,"I Want it That Way"

		if (error) {
			return console.log(error);
		} else {

			console.log(data);
			const dataSplit = data.split(",");
			console.log("dataSplit[0]: ", dataSplit[0], "dataSplit[1]: ", dataSplit[1]);
			getSong(dataSplit[1]);

		}

	});
}
// for no input
if (!dataArr1[0]) {
	console.log("Please Try Again");
}


	function getTweets() {
		var params = {
			screen_name: 'TheOnion'
		};
		
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (error) { console.info(error) }
			if (!error) {
				console.log("Latest Tweets: ");
				console.log("*****************************************");
					
					const tweets_parsed = tweets.map(word =>word.text);
					tweets_parsed.forEach(function(element) {
	    			console.log(element);
	    			});
				}
		});

	}

	function getSong(input) {
		//console.log("inside getSong ", input);

		spotify.search({
			type: 'track',
			query: input, 
			limit:3
		}, function(err, data) {

			if (err) {
				return console.log('Error occurred: ' + err);
			} else {
				//const data_parsed = data.map(items =>items.)
				// data.forEach(function(element){
				// console.log(element);	
				// })
				//console.log(data.tracks.items[0]);

				//console.log("length of data track: ", data.tracks.items.length);


				for (var i = 0; i < data.tracks.items.length; i++){
					console.log("**************************");
					var songInfo = data.tracks.items[i];
					console.log("Artist: " + songInfo.artists[0].name);
					console.log("Song: " + songInfo.name);
					console.log("Preview URL: " + songInfo.preview_url);
					console.log("Album: " + songInfo.album.name);
					console.log("**************************");
				}

			}
		});


	}

	function getMovie(input) {

		//console.log("inside getMovie: ", input);

		var queryUrl = "http://www.omdbapi.com/?t=" + input + "&apikey=" + omdbKey + "&plot=short&tomatoes=true" ;
		//console.log(queryUrl);

		request(queryUrl, function(error, response, body) {

  		if (!error && response.statusCode === 200) {
    		
    		console.log( "*******************************************");
    		console.log("Title of the movie: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating:" + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating:" + JSON.parse(body).tomatoRating);
		    console.log("Rotten Tomatoes URL: " + body.tomatoURL);
		    console.log("Country of Production: " + JSON.parse(body).Country);
		    console.log("Language of the movie: " + JSON.parse(body).Language);
		    console.log("Plot of the movie: " + JSON.parse(body).Plot);
		    console.log("Actors in the movie: " + JSON.parse(body).Actors);
		    console.log("************************************************");

  			} else{
  			console.log("Error occurred. ");
  			}
  			if (input =="Mr. Nobody"){
  				console.log("****************************");
  				console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
  				console.log("It's on Netflix!");
  			}
		});
	}


	