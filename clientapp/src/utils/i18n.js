import i18n from 'i18next'
import LanguageResource from './lang-resources';
import { initReactI18next } from 'react-i18next';

const lang = localStorage.getItem("lang");

i18n.use(initReactI18next).init({
    resources: LanguageResource,
    lng: lang ? lang : 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;