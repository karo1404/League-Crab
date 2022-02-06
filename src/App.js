import "./App.css";
import { LanguageProvider } from "./components/providers/Language";
import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

//const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

function App() {
  console.log(process.env.REACT_APP_TEST_BUILD_VARABLE);
  return (
    <LanguageProvider>
      <div className="App">
        <div className="container-fluid vh-100">
          <div className="row navbar-row align-items-center ">
            <Navbar />
          </div>
          <div className="row outlet-row">
            <Outlet />
          </div>
          <div className="row">
            <Footer />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
