import db from "db";

const defaultSettings = {
  width: 575,
  height: 355,
  dictionaryIds: ["yahoo", "cambridge", "thesaurus", "voicetube"],
  display: "window",
  autoPronounce: true,
  kanjiPronounciation: "ja",
  autoClose: true,
  clientId: "",
};
const avaliableKeys = Object.keys(defaultSettings);

export default () =>
  new Promise((resolve) => {
    db.then((db) => {
      const objectStore = db.transaction(["settings"]).objectStore("settings");
      const settings = { ...defaultSettings };
      objectStore.openCursor().onsuccess = ({ target: { result: cursor } }) => {
        if (cursor) {
          settings[cursor.key] =
            typeof cursor.value !== undefined
              ? cursor.value
              : settings[cursor.key];
          cursor.continue();
        } else {
          resolve(settings);
        }
      };
    });
  });

export const update = (settings) => {
  db.then((db) => {
    const objectStore = db
      .transaction(["settings"], "readwrite")
      .objectStore("settings");
    Object.entries(settings)
      .filter(([key]) => avaliableKeys.includes(key))
      .forEach(([key, value]) => objectStore.put(value, key));
  });
};
