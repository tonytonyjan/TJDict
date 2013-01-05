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

function query(q, params){
  init(function(){
    if(q.match(/^[\u4E00-\u9FFF\w]+/)){
      chrome.storage.sync.get("options", function(data){
        if(data.options["opt-display"] == "window"){
          var width = 400, height = 400;
          var top = params.y + 40, left = params.x;
          if(left + width > window.screen.width) left = window.screen.width - width;
          if(top + height > window.screen.height) top = window.screen.height - height;
          if(APP_WINDOW) chrome.windows.remove(APP_WINDOW.id);
          chrome.windows.create(
            {
              url: "/app/index.html?q=" + q,
              width: width,
              height: height,
              top: top,
              left: left,
              type: 'popup'
            },
            function(appWindow){
              chrome.windows.update(appWindow.id, {top: top, left: left});
              APP_WINDOW = appWindow;
              chrome.storage.local.set({appWindow: true});
            }
          );
        }else if(data.options["opt-display"] == "tab")
          chrome.tabs.create({url: "/app/index.html?q=" + q});
      });
    }
  });
}

chrome.runtime.onInstalled.addListener(function(){
  var notification = webkitNotifications.createHTMLNotification(
    '/notifications/update.html'
  );
  notification.show();
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.op){
  case "query":
    // q: query string
    query(request.q, {x: request.x, y: request.y});
    break;
  case "close":
    if(APP_WINDOW){
      chrome.windows.remove(APP_WINDOW.id);
      chrome.storage.local.set({appWindow: false});
    }
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
  var q = info.selectionText;
  chrome.storage.local.get("contextmenu", function(data){
    query(q, {x: data.contextmenu.x, y: data.contextmenu.y});
  });
});

chrome.windows.onRemoved.addListener(function(windowId){
  if(APP_WINDOW && APP_WINDOW.id == windowId) APP_WINDOW = null;
});