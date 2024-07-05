// import Vue from 'vue';
// import Vuex from 'vuex';
import modules from './modules/index.js';

// Vue.use(Vuex);


// const store = new Vuex.Store({
//   modules
// });
// console.log("Store", store.state);

import { createStore } from 'vuex'
const store = createStore({
  modules
})

export default store;
