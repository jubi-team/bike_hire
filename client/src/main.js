// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

Vue.use(Vuetify)
Vue.config.productionTip = false

export const eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: () => ({
    dialog: false
  }),
  router,
  // store,
  components: { App },
  template: '<App/>'
})
