export default new Promise((resolve, reject) => {
  const request = self.indexedDB.open("tjdict");
  request.onerror = ({ target: { error } }) => reject(error);
  request.onsuccess = ({ target: { result: db } }) => {
    db.onerror = ({ target: { error } }) => console.error(error.message);
    resolve(db);
  };
  request.onupgradeneeded = ({ oldVersion, target: { result: db } }) => {
    if (oldVersion < 1) {
      db.createObjectStore("settings");
    }
  };
});
