import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ar from './locales/ar.json'

i18n
  .use(LanguageDetector) // ব্রাউজারের ভাষা ডিটেক্ট করবে
  .use(initReactI18next) // React-এ ইন্টিগ্রেট করবে
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    fallbackLng: 'en', // ডিফল্ট ভাষা
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
