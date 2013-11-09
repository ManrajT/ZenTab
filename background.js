function tabIdArrayFrom(tabArray){
  var tabIdArray = []; 
  for(var i=0; i<tabArray.length; i++){
    tabIdArray[i] = tabArray[i].id; 
  } 
  return tabIdArray;
}; 


//startup procedure
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
  
//Prevent new tabs
chrome.tabs.onCreated.addListener(function(tab){
  if(/New\sTab/.test(tab.title)){
    chrome.tabs.remove(tab.id); 
  }
})

//Redirect links opening in new tabs back to the main tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.url && tabId != mainTabId){
    chrome.tabs.update(mainTabId, {url:tab.url, active:true}); 
    chrome.tabs.remove(tabId);
  }
})