import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'

Vue.use(VueI18n)

const defaultLocale = 'en';

// @ts-ignore
function loadLocaleMessages (): LocaleMessages {
  const locales = require.context('./i18n', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  // @ts-ignore
  const messages: LocaleMessages = {}
  let locale = localStorage.getItem('lang') || defaultLocale;
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
