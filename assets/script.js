$(document).ready(function() {
    API_key = '352cbcc2559967a6e748bbd1b737ab1e71d5f6a5'
   
    var queryURL = "https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5"
    emotionGroups = ["face-smiling", "face-affection", "face-tongue", "face-hand", "face-neutral-skeptical", "face-sleepy",
        "face-hat", "face-glasses", "face-concerned", "face-negative", "face-costume", "cat-face","monkey-face",
        "emotion", "family", "person-sport"]
    
    wordsToExclude = ['clown', 'monkey', 'poo', 'ogre', 'ghost', 'alien', 'robot', 'lying', 'skin tone', 'hornes', 'hole','speech bubble', 'ribbon', 'exclamation',' heart ','sweat', 'balloon', 'decoration'];
    function GenerateEmojis(){    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(results) {


            var emojiToPresent = [];
            for (var i = 0; i < results.length; i++) {
                if (emotionGroups.includes(results[i].subGroup)){
                    var flag = true;
                    for (var j=0; j<wordsToExclude.length; j++){
                        if (results[i].unicodeName.includes(wordsToExclude[j])){
                            console.log(results[i].unicodeName);
                            flag = false;
                        }
                    }
                    if (flag) {
                        emojiToPresent.push(results[i])
                    }
                }
            }

            console.log(emojiToPresent.length);

    
            console.log(emojiToPresent);

            random10 = choice(emojiToPresent, 30);
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