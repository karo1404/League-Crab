import { useContext } from "react";
import { LanguageContext } from "../providers/Language";

// returns localized text based on Id
const Text = ({ textId }) => {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[textId] || textId;
};

export default Text;
