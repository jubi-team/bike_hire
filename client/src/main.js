// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VTooltip from 'v-tooltip'
import store from './store';

Vue.use(VTooltip)

Vue.use(Vuetify)

Vue.use(Vuex)
Vue.config.productionTip = false

export const eventBus = new Vue();
/* eslint-disable no-new */

// const store = new Vuex.Store({
//   state: {
//     count: 0,
//     user: null
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     },
//     testName (state) {
//       // state.count++
//       state.user = "hæ"
//       console.log(state)
//     }
//   }
// })

new Vue({
  el: '#app',
  data: () => ({
    dialog: false
  }),
  router,
  // store,
  components: { App },
  template: '<App/>',
  store
})
