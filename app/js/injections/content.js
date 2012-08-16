document.addEventListener("dblclick", function(event){
  if(event.ctrlKey){
    var query = window.getSelection().toString();
    chrome.extension.sendMessage({op: "query", q: query});
  }
});

document.body.addEventListener("click", function(event){
  chrome.extension.sendMessage({op: "close"});
});