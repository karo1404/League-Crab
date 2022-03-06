import "./LoadingSpinner.css";
import spinner from "../assets/images/spinner.svg";
import React from "react";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <img src={spinner} alt="spinner" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
