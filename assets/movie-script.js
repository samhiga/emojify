//using AOS library to animate
AOS.init();
var moviesReceived = false;
var allMovies=[];
var total_movies = 0;

// function sends ajax request to treaming-availability server to retrieve movies
function pickMovie(genre, keywords){
    
    $(".loader").css("display","block");
    $("#chooseEmojis").css("display","none");
    $("#presentMovies").css("display", "block");


    for (var j=0; j<keywords.length; j++){
            
        var keyword = keywords[j];
        var settings = {
                "async": false,
                "crossDomain": true,
                "url": `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&show_type=movie&genre=${genre}&keyword=${keyword}`,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "b3dbc942ddmsh8add83241714b1ap1ace8ajsn8339705327d6",
                    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
                }
        };
        //using ajax method to get movies
        $.ajax(settings).done(function (data) {
            
            var response = JSON.parse(data);
            var results = response.result;
  
            $(".loader").css("display","none");
            total_movies += results.length;
            moviesReceived = true;
      
            //The API may occasionally produce duplicate results,
            //so we can get rid of duplicates   
            var titles = [];   
            for (var i = 0; i < results.length; i++) {
                var movie = results[i];
                if (!titles.includes(movie.title)){
                    titles.push(movie.title);
                    allMovies.push(movie);
                    displayMovie(movie);
                }              
            }   
       //storing past movies in the local storage
        localStorage.setItem("movieList", JSON.stringify(allMovies));

        $('#startOver-btn').css("display", "block")

        
        });

    }

    // no movies for the chosen keyword has been found => present the user with a default oprion.
    if (total_movies == 0){
        var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&show_type=movie&genre=${genre}`,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "b3dbc942ddmsh8add83241714b1ap1ace8ajsn8339705327d6",
                    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
                }
            };
                //if no moves then get the best rated movie
            $.ajax(settings).done(function (data) {

                var response = JSON.parse(data);
                var results = response.result;
                var bestMoviesIds = 0;
                var secondBestMoviesIds = 0;
                var moviesToPresent = [0];
                var bestMovieRating = results[0].imdbRating;

                // retieve movies with the chosen genre and choose two of them with the best raiting
                if (results.length>1){

                    
                    for (var i = 0; i < results.length; i++) {
                        var movie = results[i];
                        if (movie.imdbRating > bestMovieRating){
                            secondBestMoviesIds = bestMoviesIds;
                            bestMoviesIds = i;
                        }
                    }
                    moviesToPresent = [secondBestMoviesIds, bestMoviesIds];

                }
                //The API may occasionally produce duplicate results,
                //so we can get rid of duplicates
                var titles = [];
                moviesToPresent.forEach(element =>
                    {
                        var movie = results[element];
                        if (!titles.includes(movie.title)){
                            titles.push(movie.title);
                            allMovies.push(movie);
                            displayMovie(movie);
                        }
                        
                    }
                );

                    
                localStorage.setItem("movieListGenres", JSON.stringify(allMovies));
                $('#startOver-btn').css("display", "block")
             
            });    

    }
}

// This function takes a movie object as a parameter and displays its details in a tile format
// It first generates a comma-separated list of genres from the 'genres' array in the movie object
// Then it creates various HTML elements to build the tile layout
// The layout can be changed by modifying the 'is-half', 'is-one-third', etc. classes in the 'tile' element
// Finally, it sets animation attributes using the 'data-aos' attributes of aos library to add a flip effect to the tile
// The tile is then appended to the 'movies' element in the HTML document
function displayMovie(movie){
    movieGenres = "";
            
    for (var j=0; j<movie.genres.length; j++){
        movieGenres = movieGenres.concat(movie.genres[j].name, ', ');
    }
    movieGenres = movieGenres.substring(0, movieGenres.length - 2);


    // can change the layout here ex is-half,is-one-third, 
    var tile = $('<div class="column is-one-third is-flex">');
    var box = $('<article class="tile is-child box has-background-danger is-align-items-center">');
    var title = $('<p class="title has-text-light">').text(movie.title);
    var year = $('<p class="has-text-light">').text('Year: ' + movie.year);
    var overview = $('<p class="has-text-light">').text (movie.overview);
    var image = $('<img>').attr('src', movie.posterURLs['185']);
    var review = $('<p class="has-text-light">').text("ImDB Rating: " + movie.imdbRating / 10 + "/10");
    var media = $('<div class="media"></div>');
    var mediaContent = $('<div class="media-content"></div>').append(image);
    var mediaRight = $('<div class="media-right has-text-centered"></div>').append(review);
    var genres = $('<p class="has-text-light">').text('Genres: ' + movieGenres);

    media.append(mediaContent).append(mediaRight);
    box.append(title);
    box.append(year);
    box.append(genres);
    box.append(overview);
    box.append(media);

    tile.attr("data-aos","flip-left");
    tile.attr("data-aos-easing","ease-out-cubic");
    tile.attr("data-aos-duration","2000");
    tile.append(box);

    $("#movies").append(tile);



}

