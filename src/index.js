import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components";

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

render(<App />, document.getElementById("root"));
