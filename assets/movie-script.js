

function pickMovie(genre, keywords){

        $("#genreEmotion").empty();
        $("#KeyWordEmotion").empty();
        for (var j=0; j<keywords.length; j++){
        
            
            keyword = keywords[j];
            console.log(keyword);
            console.log(genre);

            var query = $('<h1>');
            query.text(`The results for: Genre ${genre} and keyword ${keyword}`);
            $("#results").append(query); 

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=${genre}&show_original_language=en&keyword=${keyword}`,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "b3dbc942ddmsh8add83241714b1ap1ace8ajsn8339705327d6",
                    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
                }
            };

            $.ajax(settings).done(function (data) {
                var response = JSON.parse(data);
                var results = response.result;

                for (var i = 0; i < results.length; i++) {
                    var movie = results[i];
                    // can change the layout here ex is-half,is-one-third, 
                    var tile = $('<div class="column is-one-third is-flex">');
                    // add styling to tiles here!
                    var box = $('<article class="tile is-child box has-background-danger is-align-items-center">');
                    var title = $('<p class="title has-text-light">').text(movie.title);
                    var tagline = $('<p class=" has-text-light is-size-4">').text(movie.tagline);
                    var year = $('<p class="has-text-light">').text('Year: ' + movie.year);
                    var overview = $('<p class="has-text-light">').text (movie.overview);
                    var image = $('<img>').attr('src', movie.posterURLs['185']);
                    var review = $('<p class="has-text-light">').text("ImDB Rating: " + movie.imdbRating + "/100");
                    var media = $('<div class="media"></div>');
                    var mediaContent = $('<div class="media-content"></div>').append(image);
                    var mediaRight = $('<div class="media-right has-text-centered"></div>').append(review);

                    media.append(mediaContent).append(mediaRight);
                    box.append(title);
                    box.append(tagline);
                    box.append(year);
                    box.append(overview);
                    box.append(media);

                   // box.css("background-color", "#ff4d4d");

                    tile.append(box);
            

            $("#emojis").append(tile);
        }
        });

    }
}
