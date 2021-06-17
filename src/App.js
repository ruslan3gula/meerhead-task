import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UsersList, UserEdit } from "./screens";

export const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <UsersList />
      </Route>
      <Route path="/edit-user/:id">
        <UserEdit />
      </Route>
      <Route path="/add-user">
        <UserEdit />
      </Route>
    </Switch>
  </Router>
);
