import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components";

const App = () => (
  <Provider store={store}>
    <Router>
      <Home />
    </Router>
  </Provider>
);

render(<App />, document.getElementById("root"));
