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
  })
}

catch(e){
  console.log(e);
}
      