var DEFAULT_OPTIONS = {
  "opt-display": "iframe"
}

// 設定初始化
chrome.storage.sync.get("options", function(data){
    if(typeof data.options === "undefined")
      chrome.storage.sync.set({options: DEFAULT_OPTIONS});
    else{
      for(var key in DEFAULT_OPTIONS)
        if(typeof data.options[key] === "undefined")
          data.options[key] = DEFAULT_OPTIONS[key];
      chrome.storage.sync.set({options: data.options});
    }
});

function query(q){
  if(q.match(/^\w+/)){
    chrome.storage.sync.get("options", function(data){
      if(data.options["opt-display"] == "iframe")
        chrome.tabs.executeScript({file: "/background/popupIframe.js"});
      else if(data.options["opt-display"] == "tab")
        chrome.tabs.create({url: "/app/index.html?q=" + q});
    });
  }
}

function clickContextMenu(info, tab){
  var q = info.selectionText;
  query(q);
}

window.addEventListener("load", function(){
  var ver = chrome.app.getDetails().version;
  if (localStorage.ver !== ver){
    if (localStorage.ver){
      var notification = webkitNotifications.createHTMLNotification(
        '/notifications/update.html'
      );
      notification.show();
    }
    localStorage.ver = ver;
  }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.op){
  case "query":
    // q: query string
    chrome.tabs.executeScript(sender.tab.id, {file: "/background/close.js"});
    query(request.q);
    break;
  case "close":
    chrome.tabs.executeScript(sender.tab.id, {file: "/background/close.js"});
    break;
  case "getDefaultOptions":
    sendResponse(DEFAULT_OPTIONS);
    break;
  default:
    console.error('Unkown operation "' + request.op + '"')
  }
});

chrome.contextMenus.create({
  title: "TJDict",
  contexts: ["selection"],
  onclick: clickContextMenu
});