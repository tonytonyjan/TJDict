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

window.ondblclick = query
// window.onmouseup  = query