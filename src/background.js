import browser from "./browser";

let x = 0,
  y = 0,
  width = 575,
  height = 355,
  windowId = browser.windows.WINDOW_ID_NONE;

const popup = ({ text, x, y }) => {
  browser.windows.create(
    {
      url: `index.html#/q/${encodeURIComponent(text)}`,
      type: "popup",
      left: x,
      top: y,
      width,
      height,
    },
    ({ id }) => {
      windowId = id;
      // workaround for firefox bug 1271047
      if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1)
        browser.windows.update(id, { left: x, top: y });
    }
  );
};

browser.runtime.onMessage.addListener((message, sender) => {
  switch (message.type) {
    case "COORD":
      x = message.x;
      y = message.y;
      break;
    case "QUERY":
      popup({
        text: message.text,
        x: message.x,
        y: message.y,
      });
      break;
    case "RESIZE":
      if (sender.tab.windowId === windowId) {
        width = message.width;
        height = message.height;
      }
      break;
    default:
      break;
  }
});

browser.contextMenus.create({
  id: "tjdict-query",
  title: '查詢 "%s"',
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
  if (menuItemId === "tjdict-query")
    popup({
      text: selectionText,
      x,
      y,
    });
});

browser.windows.onRemoved.addListener((id) => {
  if (id === windowId) windowId = browser.windows.WINDOW_ID_NONE;
});

browser.windows.onFocusChanged.addListener((id) => {
  if (windowId === browser.windows.WINDOW_ID_NONE || id === windowId) return;
  browser.windows.remove(windowId);
  windowId = browser.windows.WINDOW_ID_NONE;
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({ url: "index.html" });
});
