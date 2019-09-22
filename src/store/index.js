import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules
});
console.log("Store", store.state);

export default store;
