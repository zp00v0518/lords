// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import WS from './api/ws'
// import config from '../backEnd/config/config'

Vue.config.productionTip = false;
Vue.prototype.$ws = store.ws;
// Vue.prototype.$ws = new WS().init(`ws://localhost:${config.port.ws}`);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store.store,
  router,
  components: { App },
  template: '<App/>'
})
