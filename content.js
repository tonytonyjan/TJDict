function getSelected() {
  var text;
  if (window.getSelection) text = window.getSelection().toString();
  else if(document.getSelection) text = document.getSelection();
  else if(document.selection) text = document.selection.createRange().text;
  return text;
}

function query(event){
  var queryString = getSelected().trim();
  if(queryString && event.metaKey || event.ctrlKey)
    chrome.runtime.sendMessage({
      q: queryString,
      x: event.screenX,
      y: event.screenY
    });
}

var DBLCLICK = false; // prevent mouseup & dblclick messing up

window.ondblclick = function(event){
  console.log('ondblclick');
  DBLCLICK = true;
  query(event);
  setTimeout(function() {
    DBLCLICK = false;
  }, 300);
}

window.onmouseup = function(event){
  console.log('onmouseup');
  setTimeout(function() {
    if(!DBLCLICK) query(event);
  }, 300);
};