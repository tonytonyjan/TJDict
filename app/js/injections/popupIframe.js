var iframe = document.createElement("iframe");
var query = window.getSelection().toString();
var coords = getSelectionCoords();
iframe.src = chrome.extension.getURL("/app/index.html?q=" + query);
iframe.id = "tjdict-iframe";
iframe.name = "tjdict-iframe";
iframe.width = 600;
iframe.height = 600;
iframe.style.position = "fixed";

var diff;
if((diff = (coords.x + parseInt(iframe.width) - window.innerWidth)) > 0 && window.innerWidth > parseInt(iframe.width))
  iframe.style.left = coords.x - diff - 20 + "px";
else
  iframe.style.left = coords.x + 14 + "px";

if((diff = (coords.y + parseInt(iframe.height) - window.innerHeight)) > 0 && window.innerHeight > parseInt(iframe.height))
  iframe.style.top = coords.y - diff - 20 + "px";
else
  iframe.style.top = coords.y + 14 + "px";



document.body.appendChild(iframe);