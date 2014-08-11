function getSelected() {
  var text;
  if (window.getSelection)       text = window.getSelection().toString();
  else if(document.getSelection) text = document.getSelection();
  else if(document.selection)    text = document.selection.createRange().text;
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

// 觸發事件 BEGIN
var DBLCLICK = false; // 避免 mouseup & dblclick 打架

// Ctrl/Cmd + 滑鼠雙擊
window.ondblclick = function(event){
  DBLCLICK = true;
  query(event);
  setTimeout(function() {
    DBLCLICK = false;
  }, 300);
}

// Ctrl/Cmd + 滑鼠拖曳（考慮拿掉，有時候會有點煩）
window.onmouseup = function(event){
  setTimeout(function() {
    if(!DBLCLICK) query(event);
  }, 300);
};
// 觸發事件 END