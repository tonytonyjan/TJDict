var DEFAULT_OPTIONS = {
  "opt-display": "window"
}

var APP_WINDOW;

function init(callback){
  chrome.storage.sync.get("options", function(data){
    if(typeof data.options === "undefined")
      chrome.storage.sync.set({options: DEFAULT_OPTIONS}, callback);
    else{
      for(var key in DEFAULT_OPTIONS)
        if(typeof data.options[key] === "undefined")
          data.options[key] = DEFAULT_OPTIONS[key];
      if(!data.options["opt-display"].match(/^window$|^tab$/))
        data.options["opt-display"] = "window";
      chrome.storage.sync.set({options: data.options}, callback);
    }
  });
}

function popWindow(query, top, left, width, height){
  init(function(){
    if(typeof width === 'undefined') width = 400;
    if(typeof height === 'undefined') height = 400;
    closeWindow();
    chrome.windows.create({
        url: "/app/index.html?q=" + query,
        width: width,
        height: height,
        top: top,
        left: left,
        type: 'popup'
    }, function(window){
      APP_WINDOW = window;
    });
  });
}

function closeWindow(){
  if(APP_WINDOW){
    chrome.windows.remove(APP_WINDOW.id, function(){
      APP_WINDOW = null;
    });
  }
}

chrome.runtime.onInstalled.addListener(function(){
  var notification = webkitNotifications.createHTMLNotification(
    '/notifications/update.html'
  );
  notification.show();
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.op){
  case "popWindow":
    // q: query string
    chrome.storage.sync.get("options", function(data){
      if(data.options["opt-display"] == "tab")
        chrome.tabs.create({url: "/app/index.html?q=" + request.query});
      else
        popWindow(request.query, request.top, request.left, request.width, request.height);
    });
    break;
  case "closeWindow":
    closeWindow();
    break;
  case "getDefaultOptions":
    sendResponse(DEFAULT_OPTIONS);
    break;
  default:
    console.error('Unkown operation "' + request.op + '"')
  }
});

chrome.contextMenus.create({
  id: "tjdict",
  title: "TJDict",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
  chrome.storage.local.get("contextmenu", function(data){
    popWindow(info.selectionText, data.contextmenu.y, data.contextmenu.x);
  });
});

chrome.windows.onRemoved.addListener(function(windowId){
  if(APP_WINDOW && APP_WINDOW.id == windowId) APP_WINDOW = null;
});

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.create({
    url: "app/index.html"
  });
});