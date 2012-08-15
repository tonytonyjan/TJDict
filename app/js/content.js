document.addEventListener("dblclick", function(event){
  if(event.ctrlKey){
    var q = window.getSelection().toString();
    chrome.extension.sendMessage({op: "query", q:q});
  }
});