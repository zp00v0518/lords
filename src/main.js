// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ws from  './api/ws';
import config from '../backEnd/config/config';
import dictionary from './utils/dictionary';
import './components/atoms';
const bus = new Vue();

Vue.config.productionTip = false;
Vue.prototype.$ws = new ws();
Vue.prototype.$ws.init(`ws://localhost:${config.port.ws}${location.pathname}`, store);
Vue.prototype.$dictionary = dictionary;
Vue.prototype.$bus = bus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
