import pl from "./pl.json";
import en from "./en.json";

export const languages = { en, pl };

export const defaultLanguage = Object.keys(languages)[0];

export const languageOptions = {
  en: "English",
  pl: "Polski",
};
