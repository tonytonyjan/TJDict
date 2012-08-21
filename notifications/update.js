var title = "TJDict 更新至 " + chrome.app.getDetails().version;
document.head.getElementsByTagName('title')[0].innerHTML = title;
document.getElementById('title').innerHTML = title;