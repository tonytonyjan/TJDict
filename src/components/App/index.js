import React, { useCallback } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faInfo } from "@fortawesome/free-solid-svg-icons";
import Home from "components/Home";
import About from "components/About";
import Settings from "components/Settings";
import Query from "components/Query";
import { createHashHistory } from "history";
import { matchPath } from "react-router";

const history = createHashHistory();

const App = () => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    history.push(
      `/q/${encodeURIComponent(new FormData(event.target).get("query"))}`
    );
  }, []);

  const matchQuery = matchPath(history.location.pathname, {
    path: "/q/:query",
    exact: true,
  });

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
              name="query"
              className="form-control"
              type="search"
              placeholder="請輸入單字……"
              autoComplete="off"
              autoFocus
              defaultValue={matchQuery && matchQuery.params.query}
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
            render={({ match: { params } }) => <Query query={params.query} />}
          ></Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
