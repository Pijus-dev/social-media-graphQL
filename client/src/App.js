import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage/HomePage";
import PostsPage from "../src/pages/PostsPage/PostsPage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/posts" component={PostsPage} />
      </Switch>
    </>
  );
}

export default App;
