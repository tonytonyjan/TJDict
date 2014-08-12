var WINDOW_ID = chrome.windows.WINDOW_ID_NONE, // 用於關視窗
DEFAULT_WINDOW_SIZE = {width: 768, height: 475};

// 主功能 BEGIN
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  var left = request.x + DEFAULT_WINDOW_SIZE.width  > window.screen.width  ? window.screen.width  - DEFAULT_WINDOW_SIZE.width  : request.x;
  var top  = request.y + DEFAULT_WINDOW_SIZE.height > window.screen.height ? window.screen.height - DEFAULT_WINDOW_SIZE.height : request.y;
  chrome.storage.local.get(DEFAULT_WINDOW_SIZE, function(data){
    chrome.windows.create({
      url: 'index.html?q=' + request.q, type: 'popup',
      left: left, top: top,
      width: data.width, height: data.height
    }, function(win){
      WINDOW_ID = win.id;
    });
  });
});

chrome.windows.onFocusChanged.addListener(function(windowId){
  if(WINDOW_ID > 0 && windowId != WINDOW_ID){
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
      title: '已更新至 ' + current_version,
      iconUrl: 'img/icon128.png',
      message: '',
      items: CHANGELOG,
      buttons: [{title: '更多資訊', iconUrl: 'img/more.png'}, {title: '不開心？請告訴我吧！', iconUrl: 'img/email.png'}]
    }, function(notificationId){});
});

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
  if(notificationId == 'notification_update')
    if(buttonIndex == 0)
      chrome.tabs.create({url: 'https://github.com/tonytonyjan/TJDict/blob/master/CHANGELOG.md'});
    else
      chrome.tabs.create({url: 'https://chrome.google.com/webstore/support/caafmojgjlbflohillejdmnghkpcjjpp'});
});
// 擴充功能更新 END