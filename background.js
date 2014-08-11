var WINDOW_ID = chrome.windows.WINDOW_ID_NONE, WINDOW_WIDTH = 768, WINDOW_HEIGHT = 475;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  var left = request.x + WINDOW_WIDTH  > window.screen.width  ? window.screen.width  - WINDOW_WIDTH  : request.x
  var top  = request.y + WINDOW_HEIGHT > window.screen.height ? window.screen.height - WINDOW_HEIGHT : request.y
  chrome.windows.create({
    url: 'index.html?q=' + request.q, type: 'popup',
    left: left, top: top,
    width: WINDOW_WIDTH, height: WINDOW_HEIGHT
  }, function(win){
    WINDOW_ID = win.id;
  });
});

chrome.windows.onFocusChanged.addListener(function(windowId){
  if(WINDOW_ID > 0){
    chrome.windows.remove(WINDOW_ID);
    WINDOW_ID = chrome.windows.WINDOW_ID_NONE;
  }
});

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == 'update')
    var current_version = chrome.runtime.getManifest().version;
    chrome.notifications.create('',{
      type: 'list',
      title: 'TJDict 已更新至 ' + current_version,
      iconUrl: 'img/icon128.png',
      message: '',
      items: CHANGELOG[current_version].items
    }, function(notificationId){
    });
});