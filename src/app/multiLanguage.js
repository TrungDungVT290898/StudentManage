import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
const resources = {
    en: {
        translation: {
            'Welcome to React': 'Welcome to React and react-i18next',
            Name: 'Name',
        },
    },
    fr: {
        translation: {
            'Welcome to React': 'Bienvenue à React et react-i18next',
            Name: 'Bossda',
        },
    },
    vn: {
        translation: {
            'Welcome to React': 'Chào mừng đến với React',
            Name: 'Tên',
            Gender: 'Giới tính',
            Mark: 'Điểm',
            City: 'Thành phố',
            Actions: 'Thao tác',
        },
    },
};
i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    // .use(Backend)
    // // detect user language
    // // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(LanguageDetector)
    // // // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        lng: 'vn',
        fallbackLng: 'vn',
        debug: true,
        resources: resources,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
