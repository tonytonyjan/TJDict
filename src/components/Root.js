import ga from "ga";
import React, { useState, useEffect, useCallback, useRef } from "react";
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
            <Home />
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
                />
              ))}
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/help">
            <Help />
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
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </App>
  );
};

export default Root;
