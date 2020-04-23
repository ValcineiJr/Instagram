import React from "react";
import { Route, Switch } from "react-router-dom";
import Feed from "./pages/Feed";
import NewPost from "./pages/NewPost";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Feed} />
      <Route path="/new" component={NewPost} />
    </Switch>
  );
}
