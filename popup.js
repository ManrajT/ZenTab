var background = chrome.extension.getBackgroundPage();


window.onload = function() {
  var input = document.getElementById("input");
  localStorage["timeout"] = 0; 
  input.value = localStorage["timeout"];
};

window.onunload = function() {
  localStoragae["timeout"] = input.value;
  background.timer(background.timeout);
};

//Changes




