import browser from "./browser";

window.addEventListener(
  "dblclick",
  ({ screenX, screenY, metaKey, ctrlKey }) => {
    const text = window.getSelection().toString().trim();
    if (!text) return;
    if (metaKey || ctrlKey)
      browser.runtime.sendMessage({
        type: "QUERY",
        text,
        x: screenX,
        y: screenY,
      });
  }
);

window.addEventListener(
  "mouseup",
  ({ screenX, screenY, metaKey, ctrlKey, altKey }) => {
    const text = window.getSelection().toString().trim();
    if (!text) return;
    if (altKey && (metaKey || ctrlKey))
      browser.runtime.sendMessage({
        type: "QUERY",
        text,
        x: screenX,
        y: screenY,
      });
  }
);

window.addEventListener("contextmenu", ({ screenX, screenY }) => {
  if (window.getSelection().toString().trim())
    browser.runtime.sendMessage({
      type: "COORD",
      x: screenX,
      y: screenY,
    });
});
