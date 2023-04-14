//array for all the emoji characters
var movieMood = {
  "Music": ["music"] , // 🎶 // all subgroup music!
  "Romance": ["kiss", "red heart", "hearts", "heart-eyes"] , // 💏 names contating these words
  "Comedy": ["grin", "laugh", "tears of joy"], // 🤣
  "Biography": ["memo", "scroll"], // 📝
  "Family": ["family"], // 👪 
  "War": ["bomb", "Military Medal"], // 💣
  "News": ["new"], // 📰
  "Reality": ["person tipping hand", "television"], // 💁
  "Talk Show": ["speaking head"], // 🗣️
  "Adventure" : ["person mountain biking", "camping", "desert", "national park", "world map", "sunrise", "climbing", "water wave", "palm tree", "sunset"], // 🚵
  "Fantasy" : ["mage", "castle", "dragon", "merperson", "fairy", "elf"], // 🧙
  "Animation" : ["eyes", " mouse face"], //
  "Drama" : ["performing arts", "crying face", "broken heart"], // 🎭
  "Film Noir" : ['magnifying glass', 'cigarette', 'black heart', 'night with stars'], //
  "Horror" : ['face screaming in fear'], // 🧟// 😱
  "Action" : ["helicopter", "motorcycle", "pistol"], // ⚔️
  "Game Show" : ["slot machine", "thinking face"], // 🎰
  "History" : ["old man", "face with monocle", 'film frames', 'film projector', 'mantelpiece clock'], // 👴
  "Western" : ["cowboy hat face"], // 🤠
  "Musical" : ["woman dancing"], // 💃
  "Sport" : ["person-sport"], //subgroup
  "Thiller" : ["drop of blood", 'skul'], 
  "Short" : ["ruler"], // 
  "Crime" : ["police officer", "police car light", "oncoming police car", "police car"], // 👮
  "Science Fiction" : ["nerdy face", "dna", "telescope", "test tube"], // 👽
  "Mystery" : ["detective", "silhouette","briefcase",  "compass", "old key", "puzzle"], // 🕵️
  "Documentary" : ["video camera", "film frames", "bookmark tabs"] // 📹
};

//array for all the movies
var genres = {
    "Biography": "1",
    "Music": "10402",
    "Romance": "10749",
    "Family":"10751",
    "War":"10752",
    "News":"10763",
    "Reality":"10764",
    "Talk Show":"10767",
    "Adventure":"12",
    "Fantasy":"14",
    "Animation":"16",
    "Drama":"18",
    "Film Noir": "2",
    "Horror":"27",
    "Action":"28",
    "Game Show":"3",
    "Comedy":"35",
    "History":"36",
    "Western":"37",
    "Musical":"4",
    "Sport":"5",
    "Thriller":"53",
    "Short":"6",
    "Crime":"80",
    "Science Fiction":"878",
    "Mystery":"9648",
    "Documentary":"99"
}

//global variables declared
var genre;
var keywords = [];

//jquery ready function to load DOM before executing code
$(document).ready(function() {
    //This function takes an array and a size parameter as input and returns a shuffled subarray of the given size.
    // This code was found on stack overflow
    function getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }
    
    var genreEmoji = [];
    for (const [key, value] of Object.entries(movieMood)) {
        for (var j = 0; j<value.length;j++ ){
            genreEmoji.push(value[j]);
        }  
    }
    // Fetching from the Emoji API
    var queryURL = "https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5"
    
    var subGroupsEmotionToInclude =["music", "person-sport"];
    var subGroupsToInclude =["animal-bird","animal-amphibian","animal-reptile","animal-marine","animal-bug", "plant-flower", "plant-other", "food-fruit",
    "food-vegetable", "food-prepared", "food-asian", "food-marine", "food-sweet", "drink", "dishware", "transport-ground","transport-water",
    "transport-air", "hotel", "time", "event", "award-medal","game","arts-crafts","clothing"];

    var emojiToPresent = [];
    
    var keyWordsToPresent = [];
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(results) {
        $(".loader").css("display","none");
        var wordsToExclude = ["skin tone", "E0", "E1", "E2" , "E3", "E4", "E5" , "E3", 
            "E4", "E5", "E6", "E7", "E8", "E9", "couple with heart", "-thirty", "o’clock",
            "mahjong", "new moon", "selfie"]  
        // Loop through the results array 
        for (var i = 0; i < results.length; i++) {
            // Flag to check if the current result contains any word to exclude
            var flag = true;
            // Loop through the words to exclude array and check if the current result contains any of them
            for (var j=0; j<results.length; j++){
                if (results[i].unicodeName.includes(wordsToExclude[j])){
                    flag = false;
                }
            } 
            // If the current result contains any word to exclude, continue with the next iteration
            if (!flag){
                continue;
            }

            // If the current result belongs to any of the subgroups to include, add it to the keywords to present array
            if (subGroupsToInclude.includes(results[i].subGroup)){
                keyWordsToPresent.push(results[i]);
            }
            // If the current result belongs to any of the subgroups for emotions to include, add it to the emoji to present array
            if (subGroupsEmotionToInclude.includes(results[i].subGroup)){
                emojiToPresent.push(results[i]);
            }
            // If the current result doesn't belong to any of the subgroups for emotions to include,
           // check if it contains any genre emoji and add it to the emoji to present array if it does
            else{
                var flag = false; 
                for (var j=0; j<genreEmoji.length; j++){
                    if (results[i].unicodeName.includes(genreEmoji[j])){
                        flag = true;
                    }
                }
                if (flag){
                    emojiToPresent.push(results[i]);
                }
            
            }
        }
    });

    //function to display emojis
    function GenerateEmojis(){    
            // Clear previous emojis and show the chooseEmojis section
            $('#emojis').empty()
            $('#chooseEmojis').css("display", "block");
            // Get a random subset of 10 emojis from the emojiToPresent array
            var random10 = getRandomSubarray(emojiToPresent, 10);

            // Loop through the 10 emojis and create an HTML element for each one
            for (var i = 0; i < random10.length; i++) {
                // Create a div element for the emoji
                var emoji = $('<div>');
                emoji.addClass("tile");
                // Create an p element for the emoji character and add it to the emoji div
                var emojiChar = $('<p>');
                emoji.addClass("emojiDiv");
                emojiChar.css({ 'font-size': "100px" });
                emojiChar.text(random10[i].character);
                emoji.append(emojiChar);
                // Set attributes for the emoji div to store data about the emoji
                emoji.attr("data-group", random10[i].group);
                emoji.attr("data-subGroup", random10[i].subGroup);
                emoji.attr("data-name", random10[i].unicodeName);
                // Append the emoji div to the #emojis section
                $('#emojis').append(emoji);
                
            }
            // Update the text of the #click-emoji element to prompt the user to select an emoji or generate new ones
            $('#click-emoji').text("Click on the Emoji you want to select or generate new Emojis");

    }
  
    
    //generates second set of emojis based on keywords
    function GenerateKeyWords(){    
        // Clear the emojis container
        $('#emojis').empty()
        var random10 = getRandomSubarray(keyWordsToPresent, 10);
        // Loop through the 10 emojis and create an HTML element for each one
        for (var i = 0; i < random10.length; i++) {
             // Create a div element for the emoji related to the keyword
            var keyWordEmoji = $('<div>');
            keyWordEmoji.addClass("tile");
            keyWordEmoji.addClass("keyWordDiv");
              // Create an p element for the emoji character and add it to the emoji div
            var keyWordChar = $('<p>');
            keyWordChar.css({'font-size': "100px" });
            keyWordChar.text(random10[i].character);
            keyWordEmoji.append(keyWordChar);
            // Set attributes for the emoji div to store data about the emoji
            keyWordEmoji.attr("data-group", random10[i].group);
            keyWordEmoji.attr("data-subGroup", random10[i].subGroup);
            keyWordEmoji.attr("data-name", random10[i].unicodeName);
            // Append the emoji div to the #emojis section
            $('#emojis').append(keyWordEmoji);
            
        }
        // Update the text of the #click-emoji element to prompt the user to select an emoji or generate new ones
        $('#chooseKeyWord-btn').text("Generate your second Emoji again! 🌹");
    }
        
    //function to seclect the second emoji
    function pickKeyWord(){
       
        var name = $(this).attr("data-name");
        // append chosen emoji to the header 
        textAlreadyThere = $("#genreEmotion").children().eq(0).text() + $(this).children().eq(0).text();
        $("#genreEmotion").children().eq(0).text(textAlreadyThere);
       // Clear the emojis container
        $('#emojis').empty();
        // get the unicode name of the selected emoji
        name_words = name.split(" ");
         // add non-redundant words to the keywords array
        for (var j=0; j<name_words.length; j++){
            word = name_words[j];
            if (word!=="person" && word!=="face" && word!=="man" && word!=="woman" && word!=="with"&& word!=="and"){
                keywords.push(word);
            }
        }
        // if the name consists of more than one word, add it to the keywords array as well
        if (name_words.length>1){
            keywords.push(name);
        }
        // hide the "Generate your second Emoji again!" button and call the pickMovie function to generate movie recommendations
        $("#chooseKeyWord-btn").css("display", "none");
        pickMovie(genre, keywords);
        // hide the "Click on the Emoji you want to select or generate new Emojis" text
        $('#click-emoji').css("display", "none");
    }  


    //function to choose emojis and display on the top
    function pickEmoji(){
        // Set the font size and text of the chosen emoji
        var name = $(this).attr("data-name");
        var subGroup = $(this).attr("data-subGroup");
        var chosenEmoji = $('<p>');

        chosenEmoji.css({'font-size':'150px'});
        chosenEmoji.text($(this).children().eq(0).text() + " ");
        // Append the chosen emoji to the header
        $("#genreEmotion").append(chosenEmoji);
        // Hide the "Choose Emoji" button and show the "Choose KeyWord" button
        $("#chooseEmoji-btn").css("display", "none");
        $("#chooseKeyWord-btn").css("display", "block");
        // Clear the emojis container
        $('#emojis').empty();
        // Determine the genre based on the selected emoji
        if (subGroup == "music"){
            genre = genres["Music"];
        }
        else if (subGroup == "person-sport"){
            genre = genres["Sport"];
            name_words = name.split(" ");
            keywords.push(name_words[name_words.length-1]);
        }
        else{
            for (const [key, value] of Object.entries(movieMood)){
                for (var j = 0; j<value.length; j++ ){
                    if (name.includes(value[j])){
                        genre = genres[key];
                        break;
                    }
                }
            }       
        }
        // If the genre is not determined, set it to the default value "27" (Horror)
        if (!genre){
            genre = "27";
        }

    }

    //function for storing and retreiving past movie picks
    function showOldMovies(){
        // Clear the movies container
        $('#movies').empty();
        // Get the movie genres and list from localStorage
        var getMoviegenres = JSON.parse(localStorage.getItem("movieListGenres"));
        var getMovie = JSON.parse(localStorage.getItem("movieList"));

        // Display the presentMovies section and hide the chooseEmoji button
        $("#presentMovies").css("display", "block");
        // If there are movie genres in localStorage, display them
        if (getMovie!=null && getMovie.length>0 ){
            $('#chooseEmoji-btn').css("display", "none");
            // Loop through each movie and display it
            for (var j=0; j<getMovie.length; j++){
                var movie = getMovie[j];
                displayMovie(movie);
            }
            // Display the startOver button if there are movies in the list
            $('#startOver-btn').css("display", "block");
        }
        // If there are movie genres in localStorage that were found but were not related to the keyword. show them
        else if (getMoviegenres!=null && getMoviegenres.length>0){
            $('#chooseEmoji-btn').css("display", "none");
            // Loop through each movie genre and display it
            for (var j=0; j<getMoviegenres.length; j++){
                var movie = getMoviegenres[j];
                displayMovie(movie);
            }
            // Display the startOver button if there are movies in the list
            $('#startOver-btn').css("display", "block");
        }
        // If there are no movies or movie genres in localStorage, display a modal and the chooseEmojis 
        else {
            $('#modal').addClass("is-active");

            $('#chooseEmoji-btn').css("display", "block");
            $("#presentMovies").css("display", "none");
            $("#chooseEmojis").css("display","none");
        }
    }
    
    //function to restart the app
    function resetAll(){
        $('#startOver-btn').css("display", "none");
        $("#chooseEmojis").css("display","none");
        $("#presentMovies").css("display", "none");
        $('#emojis').empty();
        $('#movies').empty();
        $("#genreEmotion").empty();
        $('#chooseEmoji-btn').css("display", "block");
        $('#chooseEmoji-btn').text("Generate Emojis🤪");
        kewords = [];
  
    }
    
    //Eventlisteners to detect clicks
    $(document).on("click", "#chooseEmoji-btn", GenerateEmojis);
    $(document).on("click", "#chooseKeyWord-btn", GenerateKeyWords);
    $('.delete').on("click", function(){ $('#modal').removeClass("is-active");}); 
    $(document).on("click", ".emojiDiv", pickEmoji);
    $(document).on("click", ".keyWordDiv",pickKeyWord);
    $('#stored-movies').on("click",showOldMovies);
    $('#startOver-btn').on("click", resetAll);
     
     

});




    
