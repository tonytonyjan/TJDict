import ga from "ga";
import browser from "./browser";
import settings, { update as updateSettings } from "./settings";

let x = 0,
  y = 0,
  windowId = browser.windows.WINDOW_ID_NONE,
  tabId = browser.tabs.TAB_ID_NONE;

const popup = ({ text, x, y, tab, pageUrl }) => {
  const url = `index.html#/q/${encodeURIComponent(text)}`;
  if (
    pageUrl.startsWith(browser.runtime.getURL("/")) &&
    windowId === tab.windowId
  )
    browser.tabs.update(tab.id, { url });
  else
    settings().then((settings) => {
      switch (settings.display) {
        case "window":
          if (windowId !== browser.windows.WINDOW_ID_NONE)
            browser.windows.remove(windowId);
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
              if (process.env.BROWSER === "firefox")
                browser.windows.update(id, {
                  left:
                    x + settings.width > window.screen.width
                      ? window.screen.width - settings.width
                      : x,
                  top:
                    y + settings.height > window.screen.height
                      ? window.screen.height - settings.height
                      : y,
                });
            }
          );
          break;
        case "tab":
          if (tabId === browser.tabs.TAB_ID_NONE)
            browser.tabs.create(
              { url, index: tab.index + 1, active: true },
              ({ id }) => {
                tabId = id;
              }
            );
          else
            browser.tabs.update(tabId, { url, active: true }, () => {
              if (browser.runtime.lastError) {
                console.error(browser.runtime.lastError.message);
                browser.tabs.create(
                  { url, index: tab.index + 1, active: true },
                  ({ id }) => {
                    tabId = id;
                  }
                );
              }
            });
          break;
        default:
          break;
      }
      ga(
        "send",
        "event",
        "engagement",
        "reading_material_type",
        new URL(pageUrl).origin
      );
    });
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
        tab: sender.tab,
        pageUrl: sender.url,
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

browser.contextMenus.onClicked.addListener(
  ({ menuItemId, selectionText, pageUrl }, tab) => {
    if (menuItemId !== "tjdict-query") return;
    popup({
      text: selectionText,
      x,
      y,
      tab,
      pageUrl,
    });
  }
);

browser.windows.onRemoved.addListener((id) => {
  if (id === windowId) windowId = browser.windows.WINDOW_ID_NONE;
});

browser.windows.onFocusChanged.addListener((id) => {
  settings().then(({ autoClose }) => {
    if (
      !autoClose ||
      windowId === browser.windows.WINDOW_ID_NONE ||
      id === windowId
    )
      return;
    browser.windows.remove(windowId);
    windowId = browser.windows.WINDOW_ID_NONE;
  });
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({ url: "index.html" });
});

browser.tabs.onRemoved.addListener((id) => {
  if (id === tabId) tabId = browser.tabs.TAB_ID_NONE;
});

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason !== "update") return;

  browser.notifications.create(
    {
      type: "basic",
      title: `已更新至 v${browser.runtime.getManifest().version}`,
      iconUrl: "../../icons/icon128.png",
      message: "點我查看更新內容",
    },
    (notificationId) => {
      const handleClickNotification = (id) => {
        if (notificationId === id) {
          browser.notifications.clear(id, () => {
            browser.tabs.create(
              { url: "https://blog.tjdict.com", active: true },
              () => {
                browser.notifications.onClicked.removeListener(
                  handleClickNotification
                );
              }
            );
          });
        }
      };
      browser.notifications.onClicked.addListener(handleClickNotification);
    }
  );
});

const uuidv4 = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

browser.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    console.log(details);
    const { requestHeaders } = details;
    const cookie = requestHeaders.find(
      ({ name }) => name.toLowerCase() === "cookie"
    );
    const value = `HJ_UID=${uuidv4()}; HJ_SID=${uuidv4()}'`;
    if (cookie) cookie.value = value;
    else
      requestHeaders.push({
        name: "cookie",
        value,
      });
    return { requestHeaders };
  },
  {
    urls: ["https://dict.hjenglish.com/*"],
    types: ["xmlhttprequest"],
  },
  (() => {
    const list = ["blocking", "requestHeaders"];
    if (process.env.BROWSER === "chrome" || process.env.BROWSER === "edge")
      list.push("extraHeaders");
    return list;
  })()
);
