var movieMood = {
  "Music": ["music"] , // 🎶 // all soubgriup music!
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
  "Horror" : ['face screaming in fear'], // 🧟
  "Action" : ["helicopter", "motorcycle", "pistol"], // ⚔️
  "Game Show" : ["slot machine", "thinking face"], // 🎰
  "History" : ["old man", "face with monocle"], // 👴
  "Western" : ["cowboy hat face"], // 🤠
  "Musical" : ["woman dancing"], // 💃
  "Sport" : ["person-sport"], //subgroup
  "Thiller" : ["face screaming in fear"], // 😱
  "Short" : ["ruler"], // 
  "Adult" : ["no one under eighteen"], // 🔞
  "Crime" : ["police officer", "police car light", "oncoming police car", "police car"], // 👮
  "Science Fiction" : ["nerdy face", "dna", "telescope", "test tube"], // 👽
  "Mystery" : ["detective", "silhouette","briefcase",  "compass", "old key"], // 🕵️
  "Documentary" : ["video camera", "film frames", "bookmark tabs"] // 📹
};


$(document).ready(function() {
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
        console.log(key);
        for (var j = 0; j<value.length;j++ ){
            genreEmoji.push(value[j]);
        }
    
    }
    console.log(genreEmoji);
    
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

        
        for (var i = 0; i < results.length; i++) {
            if (results[i].unicodeName.includes("skin tone")){
                continue;
            }
            if (results[i].unicodeName.includes("E1")){
                continue;
            }
            if (results[i].unicodeName.includes("E0")){
                continue;
            }
            if (results[i].unicodeName.includes("couple with heart")){
                continue;
            }
            
            if (results[i].unicodeName.includes("E4")){
                continue;
            }
            if (results[i].unicodeName.includes("mahjong")){
                continue;
            }
            if (results[i].unicodeName.includes("E3")){
                continue;
            }
        
            if (results[i].unicodeName.includes("E6")){
                continue;
            }
            if (results[i].unicodeName.includes("E2")){
                continue;
            }
            if (results[i].unicodeName.includes("E12")){
                continue;
            }
            if (results[i].unicodeName.includes("selfie")){
                continue;
            }

            
            if (subGroupsToInclude.includes(results[i].subGroup)){
                keyWordsToPresent.push(results[i]);
            }
            if (subGroupsEmotionToInclude.includes(results[i].subGroup)){
                emojiToPresent.push(results[i]);
            }
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

  
    function GenerateEmojis(){    
            $('#emojis').empty()
            var random10 = getRandomSubarray(emojiToPresent, 10);

            console.log(random10);

            for (var i = 0; i < random10.length; i++) {

                var emoji = $('<div>');
                emojiChar = $('<h1>');
                emojiChar.css({ 'font-size': "100px" });
                emojiChar.text(random10[i].character);
                emoji.append(emojiChar);
                
                emoji.attr("data-group", random10[i].group);
                emoji.attr("data-subGroup", random10[i].subGroup);
                emoji.attr("data-name", random10[i].unicodeName);
                var p_1 = $("<p>").text("Name: " +  random10[i].unicodeName);
                var p_2 = $("<p>").text("Group: " +  random10[i].group);
                var p_3 = $("<p>").text("Subgroup: " +  random10[i].subGroup);
            
                emoji.append(p_1);
                emoji.append(p_2);
                emoji.append(p_3);
                $('#emojis').append(emoji);
                
            }
            $('#chooseEmoji-btn').text("Generate emotions again! 😉");
        
    }  

    function GenerateKeyWords(){    
        $('#emojis').empty()
        var random10 = getRandomSubarray(keyWordsToPresent, 10);

        console.log(random10);

        for (var i = 0; i < random10.length; i++) {

            var emoji = $('<div>');
            emojiChar = $('<h1>');
            emojiChar.css({ 'font-size': "100px" });
            emojiChar.text(random10[i].character);
            emoji.append(emojiChar);
            
            emoji.attr("data-group", random10[i].group);
            emoji.attr("data-subGroup", random10[i].subGroup);
            emoji.attr("data-name", random10[i].unicodeName);
            var p_1 = $("<p>").text("Name: " +  random10[i].unicodeName);
            var p_2 = $("<p>").text("Group: " +  random10[i].group);
            var p_3 = $("<p>").text("Subgroup: " +  random10[i].subGroup);
        
            emoji.append(p_1);
            emoji.append(p_2);
            emoji.append(p_3);
            $('#emojis').append(emoji);
            
        }
        $('#chooseEmoji-btn').text("Generate keywords again! 🌹");
    
}  


    $(document).on("click", "#chooseEmoji-btn", GenerateEmojis);
    $(document).on("click", "#chooseKeyWord-btn", GenerateKeyWords);

});
