function getSelected() {
  var text;
  if (window.getSelection) text = window.getSelection().toString();
  else if(document.getSelection) text = document.getSelection();
  else if(document.selection) text = document.selection.createRange().text;
  return text;
}

window.ondblclick = function(e){
  if(e.metaKey || e.ctrlKey)
    chrome.runtime.sendMessage({
      q: getSelected(),
      x: e.screenX,
      y: e.screenY
    });
}

window.onmouseup = function(e) {
  if(e.metaKey || e.ctrlKey)
    chrome.runtime.sendMessage({
      q: getSelected(),
      x: e.screenX,
      y: e.screenY
    });
}