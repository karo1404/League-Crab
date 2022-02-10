import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import Home from "./views/Home/Home";
import Summoner from "./views/Summoner/Summoner";
import { Provider } from "react-redux";
import store from "./stores/store";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />}>
            <Route index element={<Home />} />
            <Route path="summoner">
              <Route path=":name" element={<Summoner />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
