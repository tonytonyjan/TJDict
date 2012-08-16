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

function iframeDisplay(q){
  chrome.tabs.executeScript({file: "/app/js/injections/popupIframe.js"});
}

function tabDisplay(q){
  chrome.tabs.create({url: "/app/index.html?q=" + q});
};

function query(q){
  if(q.match(/^\w+/)){
    chrome.storage.sync.get("options", function(data){
      if(data.options["opt-display"] == "tab")
        tabDisplay(q);
      else if(data.options["opt-display"] == "iframe")
        iframeDisplay(q);
    });
  }
}

function clickContextMenu(info, tab){
  var q = info.selectionText;
  tabDisplay(q);
}

window.addEventListener("load", function(){
  var ver = chrome.app.getDetails().version;
  if (localStorage.ver !== ver){
    if (localStorage.ver){
      var notification = webkitNotifications.createHTMLNotification(
        '/app/notification.html'
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
    chrome.tabs.executeScript(sender.tab.id, {file: "/app/js/injections/close.js"});
    query(request.q);
    break;
  case "close":
    chrome.tabs.executeScript(sender.tab.id, {file: "/app/js/injections/close.js"});
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