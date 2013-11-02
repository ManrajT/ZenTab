/*Problems:
  1. Making port between popup and background
  2. If asychronous functions work with objects as expected
  3. Finding way to reset timers and restart timers when onActivated event fires
*/ 
chrome.runtime.onInstalled.addListener(function(detailsObject){
  if(detailsObject.reason == "install")
	localStorage["timeout"] = 5; 		//Set initival value of timeout
}

chrome.tab.onCreated.addListener(function(tab){
  var timebomb = new Timebomb(tab, localStorage["timeout"]);
}; 

chrome.tab.onUpdated.addListener(function(tabId, changeInfo){
  

chrome.tab.onActivated.addListener(function(activeInfo){

//Timebomb object for removing tabs after period of time
var Timebomb = function(tab, timeout){
  this.tab = tab;
  this.timeout = timeout;
  this.timerStart = Date.now; 
  var clearCheckID = 0;  //ID necessary for resetting timer
  
  this.stop() = function(){
    clearInterval(clearCheckID);
  };
  
  this.reset = function(){
    this.timerStart = Date.now; 
  };
  
  this.setTimeout = function(newTimeout){
    this.timeout = newTimeout;
	this.reset(); 
  };
  
  this.check = function(){
    clearCheckID = setInterval(function(){
		if(Date.now > (timerStart + timeout)) 
	  
  
//

//Just testing some changes 
    
	
  
  



