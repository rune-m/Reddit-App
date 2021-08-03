import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { StateProvider } from "./state/StateProvider";
import { createBrowserHistory } from "history";

import "./scss/index.scss";
import { Router } from "react-router-dom";

const history = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>
  <StateProvider>
    <Router {...{ history }}>
      <App />
    </Router>
  </StateProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
