//On startup, check if there are more than one tab.
//if there are, then ask if they would like to enable ZenTab
//if they do, then close all the tabs except the current one
//if they don't, then disable the extension

function tabIdArrayFrom(tabArray){
  var tabIdArray = []; 
  for(var i=0; i<tabArray.length; i++){
    tabIdArray[i] = tabArray[i].id; 
  } 
  return tabIdArray;
}; 



try{
  chrome.tabs.query({}, function(tabArray){
     var tALen = tabArray.length; 
     if(tALen > 1){
       var startResponse = confirm("Would you like enable ZenTab?\nThis will close all your tabs");
       
       if(startResponse == true){
         chrome.tabs.getCurrent(function(currentTab){
           var cTpos = tabArray.index(currentTab);
           if(cTpos == -1)
             throw "Could not find currentTab in tabArray";
            
           tabArray = tabArray.splice(ctPos, 1);
           if(tabArray.length >= tabArray.length)
             throw "Did not get shortened properly"; 
           
           chrome.tabs.remove(tabArray);  
       }
       else if(startResponse == false){
         chrome.management.setEnabled(chrome.runtime.id, false);
       }
    }
  })
  