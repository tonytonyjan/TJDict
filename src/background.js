import browser from "./browser";
import settings, { update as updateSettings } from "./settings";

let x = 0,
  y = 0,
  windowId = browser.windows.WINDOW_ID_NONE,
  tabId = browser.tabs.TAB_ID_NONE;

const popup = ({ text, x, y }) => {
  const url = `index.html#/q/${encodeURIComponent(text)}`;
  settings().then((settings) => {
    switch (settings.display) {
      case "window":
        browser.windows.create(
          {
            url,
            type: "popup",
            left: x,
            top: y,
            width: settings.width,
            height: settings.height,
          },
          ({ id }) => {
            windowId = id;
            // workaround for firefox bug 1271047
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1)
              browser.windows.update(id, { left: x, top: y });
          }
        );
        break;
      case "tab":
        if (tabId === browser.tabs.TAB_ID_NONE)
          browser.tabs.create({ url, active: true }, ({ id }) => {
            tabId = id;
          });
        else
          browser.tabs.update(tabId, { url, active: true }, () => {
            if (browser.runtime.lastError) {
              console.error(browser.runtime.lastError.message);
              browser.tabs.create({ url, active: true }, ({ id }) => {
                tabId = id;
              });
            }
          });
        break;
      default:
        break;
    }
  });
};

browser.runtime.onMessage.addListener((message, sender) => {
  switch (message.type) {
    case "COORD":
      x = message.x;
      y = message.y;
      break;
    case "QUERY":
      if (
        sender.url.startsWith(browser.runtime.getURL("/")) &&
        windowId === sender.tab.windowId
      )
        browser.tabs.update(sender.tab.id, {
          url: `index.html#/q/${encodeURIComponent(message.text)}`,
        });
      else
        popup({
          text: message.text,
          x: message.x,
          y: message.y,
        });
      break;
    case "RESIZE":
      if (sender.tab.windowId === windowId)
        updateSettings({ width: message.width, height: message.height });
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

browser.contextMenus.onClicked.addListener(console.log);
browser.contextMenus.onClicked.addListener(
  ({ menuItemId, selectionText, pageUrl }, tab) => {
    if (menuItemId !== "tjdict-query") return;
    if (
      pageUrl.startsWith(browser.runtime.getURL("/")) &&
      windowId === tab.windowId
    )
      browser.tabs.update(tab.id, {
        url: `index.html#/q/${encodeURIComponent(selectionText)}`,
      });
    else
      popup({
        text: selectionText,
        x,
        y,
      });
  }
);

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

browser.tabs.onRemoved.addListener((id) => {
  if (id === tabId) tabId = browser.tabs.TAB_ID_NONE;
});
