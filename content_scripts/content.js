document.addEventListener("dblclick", function(event){
  if(event.ctrlKey){
    var query = window.getSelection().toString().replace(/ /g,'');
    if(query.length > 0){
      chrome.extension.sendMessage({op: "popWindow", query: query, top: event.screenY, left: event.screenX});
    }
  }
});

window.addEventListener("click", function(event){
  if(!event.ctrlKey) chrome.extension.sendMessage({op: "closeWindow"});
});

window.addEventListener("contextmenu", function(event){
  chrome.storage.local.set({contextmenu: {x: event.screenX, y: event.screenY}});
});