document.addEventListener("dblclick", function(event){
  if(event.ctrlKey || event.metaKey){
    var query = window.getSelection().toString().replace(/ /g,'');
    if(!query.match(/^[\u4E00-\u9FFF\w]+/)) return; // match English and Chinese
    if(query.length > 0){
      chrome.extension.sendMessage({op: "popWindow", query: query, top: event.screenY, left: event.screenX});
    }
  }
});

document.addEventListener("mouseup", function(event){
  if(event.ctrlKey || event.metaKey){
    var query = window.getSelection().toString().replace(/ /g,'');
    if(!query.match(/^[\u4E00-\u9FBF\u3040-\u309F\u30A0-\u30FF]+/)) return; // match Japanese
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