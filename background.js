var mainTabId;

function tabIdArrayFrom(tabArray){
  var tabIdArray = []; 
  for(var i=0; i<tabArray.length; i++){
    tabIdArray[i] = tabArray[i].id; 
  } 
  return tabIdArray;
} 

function startUp(){
  chrome.tabs.query({}, function(tabArray){
     var startLength  = tabArray.length;
     if(tabArray.length > 1){
       var startResponse = confirm("Would you like enable ZenTab?\nThis will close all your tabs");
       if(startResponse == true){
         chrome.tabs.query({active:false}, function(inactiveTabs){  
           chrome.tabs.remove(tabIdArrayFrom(inactiveTabs)); 
         })
         chrome.tabs.query({currentWindow:false}, function(tabsInOtherWindows){  
           chrome.tabs.remove(tabIdArrayFrom(tabsInOtherWindows)); 
         })
       }
       else if(startResponse == false){
         chrome.management.setEnabled(chrome.runtime.id, false);
       }
     }
     chrome.tabs.query({active:true, windowType:"normal"}, function(tabArray){
       mainTabId = tabArray[0].id;    //mainTabId is not being set 
     })
  })
}

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if(tabId == mainTabId){
    mainTabId = undefined;
  }
})

chrome.tabs.onCreated.addListener(function(tab){
  if(/New\sTab/.test(tab.title)){	//Prevent new tab from being opened
    chrome.tabs.remove(tab.id); 
  }
  else if(mainTabId == undefined){   //Redo startup() if mainTab's been closed
    startUp();
  }
})


//Redirect links opening in new tabs back to the main tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.url && tabId != mainTabId){
    chrome.tabs.remove(tabId);
    chrome.tabs.update(mainTabId, {url:tab.url, active:true}); 
    
  }
})

startUp(); 


    