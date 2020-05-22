import browser from "./browser";

window.addEventListener(
  "dblclick",
  ({ screenX, screenY, metaKey, ctrlKey }) => {
    if (metaKey || ctrlKey)
      browser.runtime.sendMessage({
        type: "QUERY",
        text: window.getSelection().toString(),
        x: screenX,
        y: screenY,
      });
  }
);

window.addEventListener(
  "mouseup",
  ({ screenX, screenY, metaKey, ctrlKey, altKey }) => {
    if (altKey && (metaKey || ctrlKey))
      browser.runtime.sendMessage({
        type: "QUERY",
        text: window.getSelection().toString(),
        x: screenX,
        y: screenY,
      });
  }
);

window.addEventListener("contextmenu", ({ screenX, screenY }) => {
  if (window.getSelection().toString())
    browser.runtime.sendMessage({
      type: "COORD",
      x: screenX,
      y: screenY,
    });
});
