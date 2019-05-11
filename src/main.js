// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './components/atoms';
import './assets/main.scss';
import './assets/mixins.scss';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Ws from './api/ws';
import config from '../backEnd/config/config';
const region = require('../backend/region/Region');
const variables = require('../backend/variables/game_variables');

const bus = new Vue();

Vue.config.productionTip = false;
Vue.prototype.$ws = new Ws();
Vue.prototype.$ws.init(
  `ws://localhost:${config.port.ws}${location.pathname}`,
  store
);
Vue.prototype.$region = region;
Vue.prototype.$bus = bus;
Vue.prototype.$lang = store.state.local.lang;
Vue.prototype.$var = variables;

Vue.filter('upperFirstSymbol', function(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
});

/* eslint-disable no-new */

function mounting() {
  // eslint-disable-next-line
  if (sourceLoader.loadedNum !== sourceLoader.sourceNum) {
    setTimeout(mounting, 100);
  } else {
    new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    });
  }
}

mounting();
