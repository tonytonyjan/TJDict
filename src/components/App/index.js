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
import settings, { update as updateSettings } from "settings";
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
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [dictionaryIds, setDictionaryIds] = useState([]);
  const inputRef = useRef(null);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    history.push(
      `/q/${encodeURIComponent(new FormData(event.target).get("query"))}`
    );
  }, []);

  const handleAddDictionary = useCallback((dictId) => {
    setDictionaryIds((prev) => [...prev, dictId]);
  }, []);

  const handleMoveUpDictionary = useCallback((dictId) => {
    setDictionaryIds((prev) => {
      const index = prev.indexOf(dictId);
      prev.splice(index - 1, 0, prev.splice(index, 1)[0]);
      return [...prev];
    });
  }, []);

  const handleRemoveDictionary = useCallback((dictId) => {
    setDictionaryIds((prev) => prev.filter((i) => i !== dictId));
  }, []);

  useEffect(() => {
    if (settingsLoaded) updateSettings({ dictionaryIds });
  }, [dictionaryIds, settingsLoaded]);

  useEffect(() => {
    history.listen(({ pathname }) => {
      const query = matchQuery(pathname);
      if (query) inputRef.current.value = query;
    });
  }, []);

  useEffect(() => {
    settings.then(({ dictionaryIds }) => {
      setDictionaryIds(dictionaryIds);
      setSettingsLoaded(true);
    });
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
            render={({ match: { params } }) => (
              <Query query={params.query} dictionaryIds={dictionaryIds} />
            )}
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
                          <General />
                        </Route>
                        <Route path={`${path}/dictionaries`}>
                          <Dictionaries
                            dictionaryIds={dictionaryIds}
                            unusedDictionaryIds={Object.keys(
                              dictionaries
                            ).filter(
                              (dictId) => !dictionaryIds.includes(dictId)
                            )}
                            onAddDictionary={handleAddDictionary}
                            onMoveUpDictionary={handleMoveUpDictionary}
                            onRemoveDictionary={handleRemoveDictionary}
                          />
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
