import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import de from './src/locales/de.json';
import en from './src/locales/en.json';
import es from './src/locales/es.json';
import fr from './src/locales/fr.json';
import it from './src/locales/it.json';
import nl from './src/locales/nl.json';
import ro from './src/locales/ro.json';
import zh from './src/locales/zh.json';

void i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    de: { translation: de },
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    it: { translation: it },
    nl: { translation: nl },
    ro: { translation: ro },
    zh: { translation: zh },
  },
});

export default i18n;
