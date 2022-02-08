import React, { useContext } from "react";
import { LanguageContext } from "./providers/LanguageProvider";
import "./SearchInput.css";
import { getText } from "./Text";
import propTypes from "prop-types";

function SearchInput({ value, setValue }) {
  const { dictionary } = useContext(LanguageContext);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      className=""
      placeholder={getText(dictionary, "summonerName")}
      type="text"
      autoFocus={true}
      alt="search"
      value={value}
      onChange={(e) => changeHandler(e)}
    />
  );
}

SearchInput.propTypes = {
  value: propTypes.string.isRequired,
  setValue: propTypes.func.isRequired,
};

export default SearchInput;
