
function tabIdArrayFrom(tabArray){
  var tabIdArray = []; 
  for(var i=0; i<tabArray.length; i++){
    tabIdArray[i] = tabArray[i].id; 
  } 
  return tabIdArray;
}; 



//On startup, check if there are more than one tab.
//if there are, then ask if they would like to enable ZenTab
//if they do, then close all the tabs except the current one
//if they don't, then disable the extension

var mainTabId; 

  chrome.tabs.query({}, function(tabArray){
     var startLength  = tabArray.length;
     if(tabArray.length > 1){
       var startResponse = confirm("Would you like enable ZenTab?\nThis will close all your tabs");
       //How to close popups??
       if(startResponse == true){
         chrome.tabs.query({active:false}, function(inactiveTabs){
           chrome.tabs.remove(tabIdArrayFrom(inactiveTabs)); 
         })
       }
       else if(startResponse == false){
         chrome.management.setEnabled(chrome.runtime.id, false);
       }
     }
     
     chrome.tabs.query({active:true, windowType:"normal"}, function(tabArray){
       mainTabId = tabArray[0].id;    //What if mainTab changes? The entire extension fails...  
     })
  })
  
//If a new tab is created, 
//a) close it
//b) redirect the main window towards it

chrome.tabs.onCreated.addListener(function(tab){
  if(/*tab is opened by user manually*/){
    chrome.tabs.remove(tab); 
  }
  else if(/*tab was opened by by user accidentally*/){
    chrome.tabs.update(mainTabId, {url:tab.url, active:true}); //what if URL has not been set yet...
    chrome.tabs.remove(tab);