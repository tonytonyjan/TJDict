import getSettings, { update as updateSettings } from "settings";

(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);

const init = new Promise((resolve) => {
  getSettings().then((settings) => {
    window.ga("create", "UA-71890573-3", {
      storage: "none",
      clientId: settings.clientId,
    });
    window.ga((tracker) => {
      const clientId = tracker.get("clientId");
      updateSettings({ clientId });
      window.ga("set", "dimension1", clientId);
    });
    window.ga("set", "checkProtocolTask", null);
    settings.dictionaryIds.forEach((dict, index) => {
      window.ga("send", "event", "settings", "dictionary_order", dict, index, {
        nonInteraction: true,
      });
    });
    resolve();
  });
});

export default function () {
  init.then(() => {
    window.ga.apply(null, arguments);
  });
}
