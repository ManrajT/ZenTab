//Peak into what this is doing through alerts and inspect views console
//What to do about other open tabs?  What do I do on first install?  
//   --> chrome.management.setEnabled on startup
//How to keep chrome settings un touched
//onCreated + lastFocused workaround + remove + update 



//close all other tabs at startup
chrome.runtime.onStartup.addListener(function(){
  alert("extension has just started");
  
  /*
  var startResponse = confirm("Would you like to start ZenTab now?  This will close all tabs except the currently active."); 
  if(startResponse == false){
    chrome.management.setEnabled(ExtensionInfo.id, false); 
  }
  */
 }
);    



//save active tab...
var currentTab;

//when the program first loads up   *the first page will be the chrome page...
chrome.tabs.getCurrent(function(tab){
  currentTab = tab;
};  

//as it's url changes 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){ 
    for (var change in changeInfo){
      if(change == "url" && tab.active == true && /chrome:/.test(tab.url) == false){ 
        currentTab = tab; 
        alert("URL has changed to " + changeInfo["url"]);
      }
    } 
});
   


//move newly opened tab to where the last currentTab was
chrome.tabs.onCreated.addListener(function(tab){
  if(typeof currentTab != "undefined" && /chrome:/.text(tab.url) == false){ 
    chrome.tabs.update({url: currentTab.url});
  }  
}); 

//close all 




//Force newly opened tab to URL of 


//Passing over that data onCreated
 




