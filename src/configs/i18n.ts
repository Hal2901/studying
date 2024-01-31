import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "../assets/locales";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('i18nextLng') || "vi" ,
  resources,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
