import React, { useCallback, useRef, useEffect, useState } from "react";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faInfo } from "@fortawesome/free-solid-svg-icons";
import Home from "components/Home";
import About from "components/About";
import Settings from "components/Settings";
import Query from "components/Query";
import { createHashHistory } from "history";
import { matchPath } from "react-router";
import Dictionaries from "components/Dictionaries";
import General from "components/General";
import { default as getSettings, update as updateSettings } from "settings";
import dictionaries from "dictionaries";

const history = createHashHistory();
const matchQuery = (pathname) => {
  const match = matchPath(pathname, {
    path: "/q/:query",
    exact: true,
  });
  return match ? match.params.query : "";
};
const initQuery = matchQuery(history.location.pathname);

const App = () => {
  const [settings, setSettings] = useState(null);
  const inputRef = useRef(null);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const query = new FormData(event.target).get("query").trim();
    if (!query) return;

    history.push(
      `/q/${encodeURIComponent(new FormData(event.target).get("query"))}`
    );
  }, []);

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
    if (settings) updateSettings(settings);
  }, [settings]);

  useEffect(() => {
    history.listen(({ pathname }) => {
      const query = matchQuery(pathname);
      if (query) inputRef.current.value = query;
    });
  }, []);

  useEffect(() => {
    getSettings().then((settings) => setSettings(settings));
  }, []);

  return (
    <Router history={history}>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <Link to="/" className="navbar-brand d-none d-sm-inline-block">
            TJDict
          </Link>
          <form
            className="flex-grow-1 flex-sm-grow-0 mr-sm-4"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              name="query"
              className="form-control"
              type="search"
              placeholder="請輸入單字……"
              autoComplete="off"
              autoFocus
              defaultValue={initQuery}
            />
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/settings">
                  <FontAwesomeIcon fixedWidth icon={faCog} /> 設定
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/about">
                  <FontAwesomeIcon fixedWidth icon={faInfo} /> 關於
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            exact
            path="/q/:query"
            render={({ match: { params } }) =>
              settings && (
                <Query
                  query={params.query}
                  dictionaryIds={settings.dictionaryIds}
                />
              )
            }
          ></Route>
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
      </main>
    </Router>
  );
};

export default App;
