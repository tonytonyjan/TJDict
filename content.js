function getSelected() {
  var text;
  if (window.getSelection)       text = window.getSelection().toString();
  else if(document.getSelection) text = document.getSelection();
  else if(document.selection)    text = document.selection.createRange().text;
  return text;
}

function query(x, y){
  var queryString = getSelected().trim();
  chrome.runtime.sendMessage({
    q: queryString,
    x: x, y: y
  });
}

// 觸發事件 BEGIN
// Ctrl/Cmd + 滑鼠雙擊
window.ondblclick = function(event){
  if(event.metaKey || event.ctrlKey) query(event.screenX, event.screenY);
}

// Ctrl/Cmd + Alt + 滑鼠拖曳
window.onmouseup = function(event){
  if(event.altKey && event.metaKey || event.ctrlKey) query(event.screenX, event.screenY);
};

// 右鍵時記錄滑鼠位置
window.oncontextmenu = function(event){
  chrome.storage.local.set({x: event.screenX, y: event.screenY});
}
// 觸發事件 END