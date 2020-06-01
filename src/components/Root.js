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

const history = createHashHistory();
window.ga("set", "page", history.location.pathname);
window.ga("send", "pageview");

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
    default:
      break;
  }
};

const Root = () => {
  const [settings, setSettings] = useState(null);
  const [contents, setContents] = useState({});

  const inputRef = useRef(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const query = new FormData(event.target).get("query").trim();
    if (!query) return;

    history.push(
      `/q/${encodeURIComponent(new FormData(event.target).get("query"))}`
    );
  }, []);

  const speak = useCallback(() => {
    if (!settings) return;
    const query = matchQuery(history.location.pathname);
    if (!query) return;
    const langs = detectLanguage(query);
    if (!langs.length) return;
    const utterance = new SpeechSynthesisUtterance(query);
    utterance.lang = langs.includes(settings.kanjiPronounciation)
      ? settings.kanjiPronounciation
      : langs[0];
    speechSynthesis.speak(utterance);
  }, [settings]);

  const requestQuery = useCallback(
    (query) => {
      if (!settings) return;
      if (settings.autoPronounce) speak();
      setContents({});
      settings.dictionaryIds.forEach((dictId) => {
        dictionaries[dictId](query).then((node) => {
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
          }
        });
      });
    },
    [settings, speak]
  );

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
  });

  useEffect(() => {
    getSettings().then((settings) => setSettings(settings));
  }, []);

  useEffect(() => {
    if (settings) updateSettings(settings);
  }, [settings]);

  useEffect(() => {
    const unlisten = history.listen(({ pathname }) => {
      window.ga("set", "page", pathname);
      window.ga("send", "pageview");
      const query = matchQuery(history.location.pathname);
      if (!query) return;
      inputRef.current.value = query;
      requestQuery(query);
    });
    return unlisten;
  }, [requestQuery]);

  useEffect(() => {
    if (initQuery) requestQuery(initQuery);
  }, [requestQuery]);

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
            {settings && (
              <Query
                notFound={settings.dictionaryIds.every(
                  (dictId) => contents[dictId] === false
                )}
                dictionaries={settings.dictionaryIds
                  .map((dictId) => ({
                    id: dictId,
                    title: dictId,
                    content: contents[dictId],
                  }))
                  .filter((dict) => dict.content)}
              />
            )}
          </Route>
          <Route exact path="/about">
            <About />
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
                              unusedDictionaryIds={Object.keys(
                                dictionaries
                              ).filter(
                                (dictId) =>
                                  !settings.dictionaryIds.includes(dictId)
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
