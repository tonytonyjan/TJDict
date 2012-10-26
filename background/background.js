var DEFAULT_OPTIONS = {
  "opt-display": "iframe"
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
      chrome.storage.sync.set({options: data.options}, callback);
    }
  });
}

function query(q, params){
  init(function(){
    if(q.match(/^[\u4E00-\u9FFF\w]+/)){
      chrome.storage.sync.get("options", function(data){
        if(data.options["opt-display"] == "iframe"){
          var width = 400, height = 400;
          var top = params.y + 40, left = params.x;
          if(APP_WINDOW) APP_WINDOW.close();
          chrome.app.window.create("/app/index.html?q=" + q,
            {
              width: width,
              height: height,
              top: top,
              left: left
            },
            function(appWindow){
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
      APP_WINDOW.close();
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
  //onclick: clickContextMenu
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
  var q = info.selectionText;
  query(q);
});