AOS.init();
function pickMovie(genre, keywords){
    var total_movies = 0;

    $(".is-ancestor").css("display", "block");
    for (var j=0; j<keywords.length; j++){
            
            keyword = keywords[j];


            var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=${genre}&keyword=${keyword}`,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "b3dbc942ddmsh8add83241714b1ap1ace8ajsn8339705327d6",
                    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
                }
            };

            $.ajax(settings).done(function (data) {
                var response = JSON.parse(data);
                var results = response.result;
                total_movies += results.length;
 
                // can change the layout here ex is-half,is-one-third, 
               
                for (var i = 0; i < results.length; i++) {
                    var movie = results[i];
                    movieGenres = "";
                    for (var j=0; j<movie.genres.length; j++){
                        movieGenres =  movieGenres.concat(movie.genres[j].name, ', ');             
                    }
                    movieGenres = movieGenres.substring(0, movieGenres.length - 2);
      
                    var tile = $('<div class="column is-one-third is-flex">');
                    // add styling to tiles here!
                    var box = $('<article class="tile is-child box has-background-danger is-align-items-left">');
                    var title = $('<p class="title has-text-light">').text(movie.title);
                    var genres = $('<p class="has-text-light">').text('Genres: ' + movieGenres);
                    var year = $('<p class="has-text-light">').text('Year: ' + movie.year);
                    var overview = $('<p class="has-text-light">').text (movie.overview);
                    var image = $('<img>').attr('src', movie.posterURLs['185']);
                    var review = $('<p class="has-text-light">').text("ImDB Rating: " + movie.imdbRating + "/100");
                    var media = $('<div class="media"></div>');
                    var mediaContent = $('<div class="media-content"></div>').append(image);
                    var mediaRight = $('<div class="media-right has-text-centered"></div>').append(review);

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


                   // box.css("background-color", "#ff4d4d");
                }   

                
        
        });

    }
    if (total_movies == 0){
        console.log("NO MOVIES FOR THIS KEYWORD!!!")
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=${genre}`,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "b3dbc942ddmsh8add83241714b1ap1ace8ajsn8339705327d6",
                "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
            }
        };

        $.ajax(settings).done(function (data) {
            var response = JSON.parse(data);
            var results = response.result;
            var bestMoviesIds = 0;
            var secondBestMoviesIds = 0;
            var moviesToPresent = [0];
            var bestMovieRating = results[0].imdbRating;
            
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
            console.log(moviesToPresent);
            
            moviesToPresent.forEach(element =>
                {
                    console.log(element);
                    var movie = results[element];
                    console.log(movie.title);
                      
                    movieGenres = "";
            
                    for (var j=0; j<movie.genres.length; j++){
                        movieGenres = movieGenres.concat(movie.genres[j].name, ', ');             
                    }
                    movieGenres = movieGenres.substring(0, movieGenres.length - 2);
        
                    
                    // can change the layout here ex is-half,is-one-third, 
                    var tile = $('<div class="column is-one-third is-flex">');
                    // add styling to tiles here!
                    var box = $('<article class="tile is-child box has-background-danger is-align-items-center">');
                    var title = $('<p class="title has-text-light">').text(movie.title);
                    var year = $('<p class="has-text-light">').text('Year: ' + movie.year);
                    var overview = $('<p class="has-text-light">').text (movie.overview);
                    var image = $('<img>').attr('src', movie.posterURLs['185']);
                    var review = $('<p class="has-text-light">').text("ImDB Rating: " + movie.imdbRating + "/100");
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
            );
        });    

    }

}
