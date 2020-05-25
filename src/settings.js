import db from "db";

export default new Promise((resolve) => {
  db.then((db) => {
    const objectStore = db.transaction(["settings"]).objectStore("settings");
    const settings = {};
    objectStore.openCursor().onsuccess = ({ target: { result: cursor } }) => {
      if (cursor) {
        settings[cursor.key] = cursor.value;
        cursor.continue();
      } else resolve(settings);
    };
  });
});
