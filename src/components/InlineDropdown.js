import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import "./InlineDropdown.css";

function InlineDropdown({ dropdownOptions, selectionCallback }) {
  const [selection, setSelection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("click", closeList);
    return () => {
      return window.removeEventListener("click", closeList);
    };
  }, []);

  const handleListOpening = (e) => {
    e.stopPropagation();
    toggleList();
  };

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const closeList = () => {
    setIsOpen(false);
  };

  const selectItem = (itemIndex) => {
    setSelection(itemIndex);
    toggleList();
    selectionCallback(itemIndex);
  };

  return (
    <div className="dropdown-wrapper">
      <button
        className="dropdown-header-button"
        onClick={(e) => handleListOpening(e)}
      >
        {dropdownOptions[selection]}
      </button>
      {isOpen && (
        <div className="dropdown-list text-left">
          {dropdownOptions.map((option, index) => (
            <button
              key={index}
              className="dropdown-list-button"
              onClick={() => selectItem(index)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

InlineDropdown.propTypes = {
  buttonText: propTypes.string,
  dropdownOptions: propTypes.array,
  selectionCallback: propTypes.func,
};

export default InlineDropdown;
