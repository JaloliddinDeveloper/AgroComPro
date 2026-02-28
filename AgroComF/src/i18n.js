import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import uz from "./locales/uz.json";
import ru from "./locales/ru.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
    },
    fallbackLng: "uz",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "sessionStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      checkWhitelist: true,
    },
  });

  const savedLang = localStorage.getItem("i18nextLng");
  if (!savedLang || !["uz", "ru"].includes(savedLang)) {
    i18n.changeLanguage("uz");
    localStorage.setItem("i18nextLng", "uz");
  }

export default i18n;
