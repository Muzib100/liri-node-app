LIRI is a Language Interpretation and Recognition Interface. It is a command line node app that takes in parameters and gives you back data. Users could use the following commands to tweets, music info, movie info etc. 
LIRI recognizes the following commands to get tweets, get inf
1)	my-tweets
2)	spotify-this-song
3)	movie-this
4)	do-what-it-says

LIRI was developed by using the following tools and languages
- Node.js
- Javascript

The npm packages used: 
- [twitter](https://www.npmjs.com/package/twitter) - an asynchronous client library for the Twitter REST and Streaming API's.
- [spotify](https://www.npmjs.com/package/node-spotify-api) - A simple to use API library for the Spotify REST API.
- [request](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
- dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

To access the data, appropriate keys were procured by creating developer accounts for the twitter, Spotify and OMDB databases.

Users could use the following commands at their terminals:
1)	For tweets: node liri my-tweets.  This will show the last 20 tweets with dates of creation.
2)	For info on songs:  node liri spotify-this-song <song name here>. This will show the following information about the song.
- Artist(s)
- The song's name 
- A preview link of the song from Spotify 
- The album that the song is from

If no song name is provided then the program will default to show info about the Album: The Sign, by artist: Ace of Base
3)	For info on movies: node liri.js movie-this <movie name here>- This will show the following information about the movie
- Title of the movie.
- Release year
- IMDB Rating
- Rotten Tomatoes Rating.
- Rotten Tomatoes URL
- Country of Production
- Language of the movie.
- Plot of the movie.
- Actors in the movie.
    
    If the user doesn't type a movie in, the program will output data for the movie ‘Mr. Nobody'

4)	If the user types in: node liri.js do-what-it-says. LIRI bot will read the text file Random.txt and extract the information requested in the next file. 

    
## Author

