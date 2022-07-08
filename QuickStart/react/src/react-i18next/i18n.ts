import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './resources'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getQueryParam } from 'utils'
const urlLang = getQueryParam('lang')
console.log(urlLang)
const lang = urlLang || localStorage.getItem('lang') || 'zh'

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'zh',
    lng: lang,
    debug: true,

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
