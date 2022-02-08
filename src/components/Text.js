import { useContext } from "react";
import { LanguageContext } from "./providers/LanguageProvider";

// returns localized text based on Id
const Text = ({ textId }) => {
  const languageContext = useContext(LanguageContext);
  return getText(languageContext.dictionary, textId);
};

export const getText = (languageDictionary, textId) => {
  return languageDictionary[textId] || textId;
};

export default Text;
