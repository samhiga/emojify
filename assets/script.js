var movieMood = {
  "Music": ["music"] , // 🎶 // all soubgriup music!
  "Romance": ["kiss", "heart"] , // 💏 names contating these words
  "Comedy": ["grin", "laugh", "tears of joy"], // 🤣
  "Biography": ["memo", "scroll"], // 📝
  "Family": ["family"], // 👪 subGroup Family
  "War": ["bomb", "Military Medal"], // 💣
  "News": ["new"], // 📰
  "Reality": ["person tipping hand", "television"], // 💁
  "Talk Show": ["speaking head"], // 🗣️
  "Adventure" : ["person mountain biking", "camping", "desert", "national park", "world map", "sunrise", "climbing", "water wave", "palm tree", "sunset"], // 🚵
  "Fantasy" : ["mage", "rainbow", "castle", "dragon", "merperson", "fairy", "elf"], // 🧙
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
    var genreEmoji = [];
    for (const [key, value] of Object.entries(movieMood)) {
        console.log(key);
        for (var j = 0; j<value.length;j++ ){
            genreEmoji.push(value[j]);
        }

    }
    console.log(genreEmoji);

    API_key = '352cbcc2559967a6e748bbd1b737ab1e71d5f6a5'
   
    var queryURL = "https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5"

    subGroupsToInclude =["music", "person-sport", "family"];
    
    function GenerateEmojis(){    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(results) {


            var emojiToPresent = [];
            for (var i = 0; i < results.length; i++) {
                if (results[i].unicodeName.includes('skin tone')){
                    continue;
                }
                if (subGroupsToInclude .includes(results[i].subGroup)){
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

            console.log(emojiToPresent.length);

    
            console.log(emojiToPresent);

            random10 = choice(emojiToPresent, 15);
            console.log(random10);

            for (var i = 0; i < random10.length; i++) {

                var emoji = $('<h1>');
                emoji.css({ 'font-size': "100px" });
                emoji.text(random10[i].character);
                emoji.attr("data-group", random10[i].group);
                emoji.attr("data-subGroup", random10[i].subGroup);
                emoji.attr("data-name", random10[i].unicodeName);
                
                var p_1 = $("<p>").text("Name: " +  random10[i].unicodeName);
                var p_2 = $("<p>").text("Group: " +  random10[i].group);
                var p_3 = $("<p>").text("Subgroup: " +  random10[i].subGroup);

                $('#emojis').append(emoji);
                $('#emojis').append(p_1);
                $('#emojis').append(p_2);
                $('#emojis').append(p_3);
                
            }
            $('#chooseEmoji-btn').text("Generate again! 😉");
        });
    }  
    $(document).on("click", "#chooseEmoji-btn", GenerateEmojis);

});
