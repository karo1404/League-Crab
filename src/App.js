import "./App.css";
import { LanguageProvider } from "./components/providers/LanguageProvider";
import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { DataProvider } from "./components/providers/DataProvider";

function App() {
  return (
    <LanguageProvider>
      <DataProvider>
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
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;
