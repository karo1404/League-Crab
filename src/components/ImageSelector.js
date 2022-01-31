import React, { useState } from "react";
import Text from "./Text";
import "./ImageSelector.css";
import propTypes from "prop-types";

function ImageSelector({ options, selectCallback }) {
  const [selection, setSelection] = useState(0);

  const handleSelectionClick = (e, option, index) => {
    if (selectCallback) selectCallback(option);
    setSelection(index);
  };

  return (
    <div className="container-fluid selector-container">
      <div className="row justify-content-around">
        {options.map((option, index) => {
          return (
            <div
              key={option.textId}
              className="col-auto align-items-center text-center"
              onClick={(e) => handleSelectionClick(e, option, index)}
            >
              <img
                className={
                  index === selection
                    ? "selector-image-active selector-image img-fluid"
                    : "selector-image img-fluid"
                }
                src={option.imageUrl}
                alt="selector"
              />
              <div
                className={
                  index === selection
                    ? "selector-text-active selector-text"
                    : "selector-text"
                }
              >
                <Text textId={option.textId} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ImageSelector.propTypes = {
  options: propTypes.array.isRequired,
  selectCallback: propTypes.func,
};

export default ImageSelector;
