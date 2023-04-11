var repoList = document.querySelector("ul");
var fetchButton = document.getElementById("fetch-button");
var emojiList = document.getElementById("emoji-list");
var selectedEmoji = document.getElementById("selected");
var emojiButton = document.getElementById("emoji-button");
var textArea = document.getElementById("area");

function getApi() {
  var requestUrl =
    "https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5";

  fetch(requestUrl)
    .then(function (response) {
      console.log("response", response);

      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      for (var i = 0; i < 30; i++) {
        // var listItem = document.createElement("li");
        // listItem.textContent = data[i].character;
        // emojiList.appendChild(listItem);
        var btn = document.createElement("button");
        btn.textContent = data[i].character;
        btn.className = "buttonClass button is-light";

        emojiButton.appendChild(btn);
      }
    });
}
fetchButton.addEventListener("click", getApi);

emojiButton.addEventListener("click", (event) => {
  if (event.target.className === "buttonClass button is-light") {
    click = event.target.textContent;
    textArea.textContent = click;
    //textArea.textContent = event.target;
  }
});
