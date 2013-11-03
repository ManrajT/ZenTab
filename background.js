//Peak into what this is doing through alerts and inspect views console
//onCreated + lastFocused workaround + remove + update 

//Storing data of currently active tab
chrome.tabs.onActivated.addListener(function(activeInfo){
  alert("Activated tab has the id:" + activeInfo.tabId); 
});

 
//Passing over that data onCreated
 




