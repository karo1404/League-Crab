import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import Home from "./views/Home/Home";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
