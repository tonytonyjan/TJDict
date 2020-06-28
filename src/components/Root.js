import ga from "ga";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import App from "components/App";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { matchPath } from "react-router";
import { createHashHistory } from "history";

import { default as getSettings, update as updateSettings } from "settings";
import dictionaries from "dictionaries";
import detectLanguage from "detectLanguage";
import Home from "components/Home";
import Query from "components/Query";
import About from "components/About";
import Settings from "components/Settings";
import Dictionaries from "components/Dictionaries";
import General from "components/General";
import NotFound from "components/NotFound";
import Help from "components/Help";
import History from "components/History";
import db from "db";

const reviewUrl = (() => {
  switch (process.env.BROWSER) {
    case "chrome":
      return "https://chrome.google.com/webstore/detail/caafmojgjlbflohillejdmnghkpcjjpp/reviews";
    case "firefox":
      return "https://addons.mozilla.org/firefox/addon/tjdict";
    default:
      return "";
  }
})();
const supportUrl =
  process.env.BROWSER === "chrome"
    ? "https://chrome.google.com/webstore/detail/caafmojgjlbflohillejdmnghkpcjjpp/support"
    : "https://www.surveycake.com/s/mDznr";

const history = createHashHistory();
ga("set", "page", history.location.pathname);
ga("send", "pageview");

history.listen(({ pathname }) => {
  ga("set", "page", pathname);
  ga("send", "pageview");
});

const matchQuery = (pathname) => {
  const match = matchPath(pathname, {
    path: "/q/:query",
    exact: true,
  });
  return match ? match.params.query : "";
};
const initQuery = matchQuery(history.location.pathname);

const handleNavigate = (name) => {
  switch (name) {
    case "home":
      history.push("/");
      break;
    case "settings":
      history.push("/settings");
      break;
    case "about":
      history.push("/about");
      break;
    case "help":
      history.push("/help");
      break;
    default:
      break;
  }
};

const Root = () => {
  const [settings, setSettings] = useState(null);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [contents, setContents] = useState({});
  const [query, setQuery] = useState(matchQuery(history.location.pathname));
  const [broadcast, setBroadcast] = useState(null);

  const inputRef = useRef(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const query = new FormData(event.target).get("query").trim();
    if (!query) return;

    history.push(`/q/${encodeURIComponent(query)}`);
  }, []);

  const speak = useCallback(() => {
    if (!settings || !query) return;
    const langs = detectLanguage(query);
    if (!langs.length) return;
    const utterance = new SpeechSynthesisUtterance(query);
    utterance.lang = langs.includes(settings.kanjiPronounciation)
      ? settings.kanjiPronounciation
      : langs[0];
    speechSynthesis.speak(utterance);
  }, [settings, query]);

  const handleAddDictionary = useCallback((dictId) => {
    setSettings((prev) => ({
      ...prev,
      dictionaryIds: [...prev.dictionaryIds, dictId],
    }));
  }, []);

  const handleMoveUpDictionary = useCallback((dictId) => {
    setSettings((prev) => {
      const index = prev.dictionaryIds.indexOf(dictId);
      console.log(dictId, index);
      prev.dictionaryIds.splice(
        index - 1,
        0,
        prev.dictionaryIds.splice(index, 1)[0]
      );
      return { ...prev, dictionaryIds: [...prev.dictionaryIds] };
    });
  }, []);

  const handleRemoveDictionary = useCallback((dictId) => {
    setSettings((prev) => ({
      ...prev,
      dictionaryIds: prev.dictionaryIds.filter((i) => i !== dictId),
    }));
  }, []);

  const handleSettingsChange = useCallback(({ key, value }) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleRemoveRecord = useCallback((_id) => {
    const id = parseInt(_id);
    db.then((db) => {
      const objectStore = db
        .transaction(["history"], "readwrite")
        .objectStore("history");
      objectStore.delete(id).onsuccess = () => {
        setHistoryRecords((prev) => prev.filter((record) => record.id !== id));
      };
    });
  }, []);

  const handleClearHistory = useCallback(() => {
    db.then((db) => {
      db
        .transaction(["history"], "readwrite")
        .objectStore("history")
        .clear().onsuccess = () => {
        setHistoryRecords([]);
      };
    });
  }, []);

  const historyMemo = useMemo(() => {
    if (historyRecords.length === 0) return [];

    const now = new Date();
    let titles = [
      {
        timeLessThan: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        ),
        name: "較舊",
      },
      {
        timeLessThan: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1
        ),
        name: "本週",
      },
      {
        timeLessThan: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ),
        name: "昨天",
      },
      {
        timeLessThan: Infinity,
        name: "今天",
      },
    ];
    titles = titles.slice(
      0,
      titles.findIndex(
        ({ timeLessThan }) => historyRecords[0].id < timeLessThan
      ) + 1
    );
    const result = [];
    historyRecords.forEach(({ id, query }) => {
      if (
        titles[titles.length - 1] &&
        id < titles[titles.length - 1].timeLessThan
      )
        result.push({
          type: "text",
          text: titles.pop().name,
        });
      result.push({
        type: "data",
        id: id.toString(),
        time: new Date(id).toLocaleString(),
        query,
      });
    });
    return result;
  }, [historyRecords]);

  useEffect(() => {
    const unlisten = history.listen(({ pathname }) => {
      setQuery((inputRef.current.value = matchQuery(pathname)));
    });
    return unlisten;
  }, []);

  // load settings
  useEffect(() => {
    getSettings().then((settings) => setSettings(settings));
  }, []);

  // save settings
  useEffect(() => {
    if (settings) updateSettings(settings);
  }, [settings]);

  // auto TTS
  useEffect(() => {
    if (!settings || !query) return;
    if (!settings.autoPronounce) return;
    speak();
  }, [settings, query, speak]);

  // query dictionaries
  useEffect(() => {
    if (!settings || !query) return;
    setContents({});
    settings.dictionaryIds.forEach((dictId) => {
      dictionaries[dictId](query)
        .then((node) => {
          if (!node) {
            setContents((prev) => ({
              ...prev,
              [dictId]: false,
            }));
            return;
          }
          if (node instanceof Node) {
            const container = document.createElement("div");
            container.appendChild(node);
            setContents((prev) => ({
              ...prev,
              [dictId]: (
                <div
                  dangerouslySetInnerHTML={{ __html: container.innerHTML }}
                ></div>
              ),
            }));
          } else if (React.isValidElement(node)) {
            setContents((prev) => ({
              ...prev,
              [dictId]: node,
            }));
          } else if (Array.isArray(node)) {
            setContents((prev) => ({
              ...prev,
              [dictId]: node.filter(React.isValidElement),
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setContents((prev) => ({
            ...prev,
            [dictId]: false,
          }));
        });
    });
  }, [settings, query]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://tonytonyjan.net/tjdict-broadcast.txt"
      );
      if (!response.ok) return;
      setBroadcast(
        <div dangerouslySetInnerHTML={{ __html: await response.text() }}></div>
      );
    })();
  }, []);

  // load history
  useEffect(() => {
    db.then((db) => {
      const now = new Date();
      const twoWeeksAgo = now - 3600000 * 24 * 14;
      const result = [];
      const objectStore = db.transaction("history").objectStore("history");
      objectStore.openCursor(
        IDBKeyRange.lowerBound(twoWeeksAgo, true),
        "prev"
      ).onsuccess = ({ target: { result: cursor } }) => {
        if (cursor) {
          result.push({ id: cursor.key, query: cursor.value });
          cursor.continue();
        } else setHistoryRecords(result);
      };
    });
  }, [query]);

  // store history
  useEffect(() => {
    if (!query) return;
    db.then((db) => {
      const objectStore = db
        .transaction(["history"], "readwrite")
        .objectStore("history");
      objectStore.add(query, Date.now());
    });
  }, [query]);

  // send query frequency (per minute) to ga
  useEffect(() => {
    if (!query) return;
    db.then((db) => {
      const oneMinuteAgo = Date.now() - 60000;
      db
        .transaction("history")
        .objectStore("history")
        .count(IDBKeyRange.lowerBound(oneMinuteAgo, true)).onsuccess = ({
        target: { result: count },
      }) => {
        ga("send", "event", "engagement", "query_frequency", undefined, count);
      };
    });
  }, [query]);

  return (
    <App
      query={initQuery}
      inputRef={inputRef}
      onNavigate={handleNavigate}
      onSubmit={handleSubmit}
      onClickSpeak={speak}
    >
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Home
              supportUrl={supportUrl}
              reviewUrl={reviewUrl}
              historyPanelProps={{
                records: historyRecords
                  .slice(0, 5)
                  .map(({ id, query }) => ({ id: id.toString(), query })),
                onClickMore: () => history.push("/history"),
                onRemoveRecord: handleRemoveRecord,
                hasMore: historyRecords.length > 5,
              }}
            />
          </Route>
          <Route exact path="/q/:query">
            {settings &&
              (settings.dictionaryIds.every(
                (dictId) => contents[dictId] === false
              ) ? (
                <NotFound />
              ) : (
                <Query
                  dictionaries={settings.dictionaryIds
                    .map((dictId) => ({
                      id: dictId,
                      title: dictionaries[dictId].displayName,
                      content: contents[dictId],
                    }))
                    .filter((dict) => dict.content)}
                  broadcast={broadcast}
                  historyPanelProps={{
                    records: historyRecords
                      .slice(0, 5)
                      .map(({ id, query }) => ({ id: id.toString(), query })),
                    onClickMore: () => history.push("/history"),
                    onRemoveRecord: handleRemoveRecord,
                  }}
                />
              ))}
          </Route>
          <Route exact path="/about">
            <About reviewUrl={reviewUrl} />
          </Route>
          <Route exact path="/help">
            <Help supportUrl={supportUrl} />
          </Route>
          <Route
            path="/settings"
            render={({ match: { path, url } }) => (
              <Switch>
                <Route exact path={path}>
                  <Redirect to="/settings/general" />
                </Route>
                <Route
                  path={`${path}/:nav`}
                  render={({ match: { params }, history }) => (
                    <Settings
                      navigation={params.nav}
                      onNavigate={(nav) => history.push(`${url}/${nav}`)}
                    >
                      <Switch>
                        <Route path={`${path}/general`}>
                          {settings && (
                            <General
                              display={settings.display}
                              autoPronounce={settings.autoPronounce}
                              kanjiPronounciation={settings.kanjiPronounciation}
                              autoClose={settings.autoClose}
                              onChange={handleSettingsChange}
                            />
                          )}
                        </Route>
                        <Route path={`${path}/dictionaries`}>
                          {settings && (
                            <Dictionaries
                              dictionaryIds={settings.dictionaryIds}
                              unusedDictionaryIds={Object.keys(dictionaries)
                                .filter(
                                  (dictId) =>
                                    !settings.dictionaryIds.includes(dictId)
                                )
                                .sort((a, b) =>
                                  dictionaries[a].displayName.localeCompare(
                                    dictionaries[b].displayName
                                  )
                                )}
                              onAddDictionary={handleAddDictionary}
                              onMoveUpDictionary={handleMoveUpDictionary}
                              onRemoveDictionary={handleRemoveDictionary}
                            />
                          )}
                        </Route>
                      </Switch>
                    </Settings>
                  )}
                ></Route>
              </Switch>
            )}
          ></Route>
          <Route exact path="/history">
            <History
              records={historyMemo}
              onRemoveRecord={handleRemoveRecord}
              onClearHistory={handleClearHistory}
            />
          </Route>
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </App>
  );
};

export default Root;
