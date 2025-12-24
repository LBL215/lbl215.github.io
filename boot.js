// boot.js
const bootText = ["Initializing...", "Loading modules...", "Starting system..."];
const bootDiv = document.getElementById("boot");
let i = 0;

function showNextLine() {
  if(i < bootText.length) {
    bootDiv.innerText = bootText[i];
    i++;
    setTimeout(showNextLine, 1000); // 1 second between lines
  } else {
    bootDiv.innerText = "Boot complete!";
  }
}

showNextLine();
