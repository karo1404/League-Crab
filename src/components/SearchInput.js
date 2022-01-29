import React, { useContext, useState } from "react";
import { LanguageContext } from "./providers/Language";
import "./SearchInput.css";
import { getText } from "./Text";

function SearchInput() {
  const { dictionary } = useContext(LanguageContext);
  const [inputText, setInputText] = useState("");

  const changeHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <input
      className=""
      placeholder={getText(dictionary, "summonerName")}
      type="text"
      autoFocus={true}
      alt="search"
      value={inputText}
      onChange={(e) => changeHandler(e)}
    />
  );
}

export default SearchInput;
