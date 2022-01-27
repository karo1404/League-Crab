import React, { useContext } from "react";
import { LanguageContext } from "./providers/Language";
import { languageOptions } from "../i18n";
import "./LanguageChanger.css";

function LanguageChanger({ separators }) {
  const { changeUsedLanguage } = useContext(LanguageContext);

  const getLanguagesList = () => {
    let languages = Object.keys(languageOptions);
    return languages.map((lang, index) => {
      return (
        <span key={lang}>
          <span
            className="lang-button"
            onClick={() => changeUsedLanguage(lang)}
          >
            {lang.toUpperCase()}
          </span>
          {separators && (index + 1 !== languages.length ? "|" : "")}
        </span>
      );
    });
  };

  return getLanguagesList();
}

export default LanguageChanger;
