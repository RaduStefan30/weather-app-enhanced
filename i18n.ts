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
          units: 'Units of Measurement',
          languages: 'languages',
        },
      },
      ro: {
        translation: {
          conditions: 'Condițiile meteo din {{city}}',
          global: 'Vremea în lume',
          provided: 'Informații meteorologice oferite de',
          format: 'ro-RO',
          units: 'Unități de măsură',
          languages: 'limbi',
        },
      },
      es: {
        translation: {
          conditions: 'Condiciones del tiempo en {{city}}',
          global: 'El tiempo alrededor del mundo',
          provided: 'Datos meteorológicos proporcionados por',
          format: 'es-ES',
          units: 'Unidades de medida',
          languages: 'idiomas',
        },
      },
      fr: {
        translation: {
          conditions: 'Conditions météorologiques à {{city}}',
          global: 'Météo autour du monde',
          provided: 'Données météorologiques fournies par',
          format: 'fr-FR',
          units: 'Unités de mesure',
          languages: 'langues',
        },
      },
      de: {
        translation: {
          conditions: 'Wetterbedingungen in {{city}}',
          global: 'Wetter weltweit',
          provided: 'Wetterdaten bereitgestellt von',
          format: 'de-DE',
          units: 'Maßeinheiten',
          languages: 'Sprachen',
        },
      },
      nl: {
        translation: {
          conditions: 'Weersomstandigheden in {{city}}',
          global: 'Weer wereldwijd',
          provided: 'Weergegevens aangeboden door',
          format: 'nl-NL',
          units: 'Meet eenheden',
          languages: 'talen',
        },
      },
      it: {
        translation: {
          conditions: 'Condizioni meteo a {{city}}',
          global: 'Meteo in tutto il mondo',
          provided: 'Dati meteo forniti da',
          format: 'it-IT',
          units: 'Unità di misura',
          languages: 'lingue',
        },
      },
      zh: {
        translation: {
          conditions: '{{city}} 的天气状况',
          global: '全球天气',
          provided: '天气数据由提供',
          format: 'zh-CN',
          units: '测量单位',
          languages: '语言',
        },
      },
    },
  });

export default i18n;
