import Vue from 'vue';
import {extend, localize, ValidationObserver, ValidationProvider} from "vee-validate";
import {Rules} from "vee-validate/dist/types/index.full";
import i18n from '@/i18n'
import moment from "moment";
interface Rules {
    [key: string]: any;
}
function loadLocale() {
    const lang = localStorage.getItem('lang') || 'en';
    return import(`vee-validate/dist/locale/${lang}.json`).then(locale => {
        localize(lang, locale);
    });
}
// Set default language
loadLocale().then(() => {

    const rules: Rules = require('vee-validate/dist/rules');

    Object.keys(rules).forEach(rule => {
        extend(rule, rules[rule]);
    });

    Vue.component('ValidationObserver', ValidationObserver);
    Vue.component('ValidationProvider', ValidationProvider);
})

