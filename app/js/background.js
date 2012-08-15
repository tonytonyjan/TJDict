function query(q){
  if(q.match(/^\w+/))
    chrome.tabs.create({url: "/app/index.html?q=" + q});
}

function clickContextMenu(info, tab){
  var q = info.selectionText;
  query(q);
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.op){
  case "query":
    // q: query string
    query(request.q);
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