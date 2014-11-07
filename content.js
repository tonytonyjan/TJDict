function getSelected() {
  var text;
  if (window.getSelection)       text = window.getSelection().toString();
  else if(document.getSelection) text = document.getSelection();
  else if(document.selection)    text = document.selection.createRange().text;
  return text;
}

function query(x, y){
  var queryString = getSelected().trim();
  if(queryString)
    chrome.runtime.sendMessage({
      q: queryString,
      x: x, y: y
    });
}

// 觸發事件 BEGIN
// Ctrl/Cmd + 滑鼠雙擊
window.addEventListener('dblclick', function(event){
  if(event.metaKey || event.ctrlKey) query(event.screenX, event.screenY);
});

// Ctrl/Cmd + Alt + 滑鼠拖曳
window.addEventListener('mouseup', function(event){
  if(event.altKey && (event.metaKey || event.ctrlKey)) query(event.screenX, event.screenY);
});

// 右鍵時記錄滑鼠位置
window.addEventListener('contextmenu', function(event){
  chrome.storage.local.set({x: event.screenX, y: event.screenY});
});

// 按住一秒 BEGIN
var TIMEOUT_ID, HOLD;

window.addEventListener('mousedown', function(event){
  chrome.storage.sync.get({hold_feature: false}, function(items){
    if(items.hold_feature){
      HOLD = true;
      if(TIMEOUT_ID) clearTimeout(TIMEOUT_ID);
      TIMEOUT_ID = setTimeout(function(){
        if(HOLD) query(event.screenX, event.screenY);
        HOLD = false;
      }, 1000);
    }
  });
});

window.addEventListener('mouseup', function(event){HOLD = false;});
window.addEventListener('mousemove', function(event){
  if(TIMEOUT_ID){clearTimeout(TIMEOUT_ID); TIMEOUT_ID = null;}
});
// 按住一秒 END

// 觸發事件 END