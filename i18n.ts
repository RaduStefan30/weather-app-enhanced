import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          conditions: '{{city}} Weather Conditions',
          global: 'Weather Around the globe',
          provided: 'Weather data provided by',
          format: 'en-GB',
        },
      },
      ro: {
        translation: {
          conditions: 'Vremea in {{city}}',
          global: 'Vremea pe glob',
          provided: 'Informatii meteorologice oferite de',
          format: 'ro-RO',
        },
      },
    },
  });

export default i18n;
