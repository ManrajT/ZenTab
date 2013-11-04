//Peak into what this is doing through alerts and inspect views console
//What to do about other open tabs?  What do I do on first install?  
//   --> chrome.management.setEnabled on startup
//How to keep chrome settings un touched
//onCreated + lastFocused workaround + remove + update 


//--------------Starting Extension ----------------\\

var startResponse = confirm("Would you like to enable ZenTab?\n This will close all tabs."); 

if(startResponse == false){
    chrome.management.setEnabled(chrome.runtime.id, false); //disable extension
}
else if(startResponse == true){
  chrome.tabs.query({}, function(tabArray){  //replace all open tabs with a single blank tab
    var tabIdArray = tabIdArrayFrom(tabArray); 
    chrome.tabs.create({url:"about:blank"});
    chrome.tabs.remove(tabIdArray);
  })
}

var currentTab;
chrome.tabs.getCurrent(function(tab){
  currentTab = tab;
})

//when the program first loads up   *the first page will be the chrome page...
chrome.tabs.getCurrent(function(tab){
  currentTab = tab;
}) 

//as it's url changes 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){ 
    for (var change in changeInfo){
      if(change == "url" && tab.active == true && /chrome:/.test(tab.url) == false){ 
        currentTab = tab; 
        /*alert("URL has changed to " + changeInfo["url"]);*/
      }
    } 
})
   


//move newly opened tab to where the last currentTab was
chrome.tabs.onCreated.addListener(function(tab){
  if(typeof currentTab != "undefined" && /chrome:/.test(tab.url) == false){ 
    chrome.tabs.update({url: currentTab.url});
  }  
}) 


function tabIdArrayFrom(tabArray){
  var tabIdArray = []; 
  for(var i=0; i<tabArray.length; i++){
    tabIdArray[i] = tabArray[i].id; 
  } 
  return tabIdArray;
}; 
 




