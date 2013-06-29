/*Problems:
  1. Making port between popup and background
  2. If asychronous functions work with objects like normal
  3. Integrating flags for certain events with my check function
*/ 
chrome.runtime.onInstalled.addListener(function(detailsObject){
  if(detailsObject.reason == "install"
	localStorage["timeout"] = 5; 		//Set initival value of timeout
}

chrome.runtime.onStartup.addListener(function
//Timebomb object for removing tabs after period of time
var Timebomb = function(tab, timeout){
  this.tab = tab;
  this.timeout = timeout;
  this.timerStart = Date.now; 
  
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
    var clearCheckID = setInterval(function(){
		if(Date.now > (timerStart + timeout)) 
	  
  
//
    
	
  
  



