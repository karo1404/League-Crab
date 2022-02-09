import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import Home from "./views/Home/Home";
import Summoner from "./views/Summoner/Summoner";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/styles/index.css";

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById("root")
);
