var WINDOW_ID = chrome.windows.WINDOW_ID_NONE, // 用於關視窗
WINDOW_WIDTH  = 768,
WINDOW_HEIGHT = 475;

// 主功能 BEGIN
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
// 主功能 END

// 擴充功能更新 BEGIN
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == 'update')
    var current_version = chrome.runtime.getManifest().version;
    chrome.notifications.create('notification_update',{
      type: 'list',
      title: 'TJDict 已更新至 ' + current_version,
      iconUrl: 'img/icon128.png',
      message: '',
      items: CHANGELOG[current_version].items,
      buttons: [{title: '不開心？告訴我吧～', iconUrl: 'img/email.png'}]
    }, function(notificationId){});
});

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
  if(notificationId == 'notification_update')
    chrome.tabs.create({url: 'mailto:tonytonyjan@gmail.com?subject=[TJDict]%20'});
});
// 擴充功能更新 END