import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
import EnTrans from "./locales/en/translation.json"
import CnTrans from "./locales/cn/translation.json"


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    initImmediate: false,
    preload: ["en", "cn"],
    fallbackLng: "en",
    lng: "en",

    // have a common namespace used around the full app
    ns: ['translation'],
    defaultNS: 'translation',

    // debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    resources: {
      en: {
        translation: EnTrans
      },
      jap: {
        translation: CnTrans
      }
    }
  });

  export default i18n;