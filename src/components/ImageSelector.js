import React from "react";
import Text from "./Text";
import "./ImageSelector.css";

function ImageSelector({ options }) {
  if (!options) {
    throw new Error("options do not exist");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {options.map((option) => {
          return (
            <div
              key={option.textId}
              className="col align-items-center text-center"
            >
              <img
                className="selector-image img-fluid"
                src={option.imageUrl}
                alt="region"
              />
              <Text textId={option.textId} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageSelector;
