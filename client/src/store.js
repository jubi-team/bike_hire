import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

// const store = new Vuex.Store({
//     state: {
//         // user: null
//     },
//     mutations: {
//         testUser(state) {
//             state.user = "hihihhiihi"
//         }
//     }
// });

// export default store


const store = new Vuex.Store({
    state: {
      user: null,
    //   navigation: { path: '/home' }
    },
    mutations: {
        testUser(state, name) {
            state.user = name
        }
    },
    getters: {
        getUser(state){
            return state.user
        }
    },
    plugins: [new VuexPersistence().plugin]
  })
   
  export default store