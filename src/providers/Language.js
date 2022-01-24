import { createContext, useState } from "react";
import { languages, defaultLanguage } from "../languages";

export const LanguageContext = createContext({
  usedLanguage: defaultLanguage,
  dictionary: languages.en,
});

export const LanguageProvider = ({ children }) => {
  const [usedLanguage, setUsedLanguage] = useState(defaultLanguage);

  const provider = {
    usedLanguage,
    dictionary: languages[usedLanguage],
    changeUsedLanguage: (lang) => {
      const newLanguage = languages[lang] ? lang : defaultLanguage;
      setUsedLanguage(newLanguage);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};
