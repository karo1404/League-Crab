import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import "./InlineDropdown.css";

function InlineDropdown({ dropdownOptions, selectionCallback }) {
  const [selection, setSelection] = useState(dropdownOptions[0]);
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

  const selectItem = (item, index) => {
    setSelection(item);
    toggleList();
    selectionCallback(item, index);
  };

  return (
    <div className="dropdown-wrapper">
      <button
        type="button"
        className="dropdown-header-button"
        onClick={(e) => handleListOpening(e)}
      >
        {selection}
        <span style={{ float: "right", marginRight: "1.75rem" }}>
          {isOpen ? "▴" : "▾"}
        </span>
      </button>
      {isOpen && (
        <div className="dropdown-list text-left">
          {dropdownOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className="dropdown-list-button"
              onClick={() => selectItem(option, index)}
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
