import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import '@/styles/global.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faGlobe,
  faMoon,
  faSun,
  faBars,
  faClock,
  faStar,
    faArrowsUpDown,
    faArrowDownWideShort
} from '@fortawesome/free-solid-svg-icons'
import i18n from './i18n'
import VueNeo4j from 'vue-neo4j'
import VueApollo from "vue-apollo";
import {apolloProvider} from "../apollo.config";


Vue.use(VueApollo)
Vue.use(VueNeo4j)
require('./vee-validate')

library.add(
    faMagnifyingGlass,
    faGlobe,
    faMoon,
    faSun,
    faBars,
    faClock,
    faStar,
    faArrowsUpDown,
    faArrowDownWideShort
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$store = store;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
