import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "components/Home";
import About from "components/About";
import Query from "components/Query";

const App = () => {
  return (
    <Router>
      <Link to="/">home</Link>
      <Link to="/q/apple">query</Link>
      <Link to="/about">about</Link>
      <hr />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          path="/q/:query"
          render={({ match: { params } }) => <Query query={params.query} />}
        ></Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
