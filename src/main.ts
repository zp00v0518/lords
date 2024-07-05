import { createApp } from 'vue'
import store from './store/index.js'
import Ws from './api/ws'

import './components/atoms'
import './assets/main.scss'
import upperFirstSymbol from './components/mixins/upperFirstSymbol.vue'
import globalConfig from './components/mixins/globalConfig.vue'
import gloss from './components/mixins/glossary.vue'

import variables from '../backend/variables/game_variables.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)
console.log(app)

app.use(router)
app.use(store)

Vue.config.productionTip = false
Vue.prototype.$ws = new Ws()
Vue.prototype.$ws.init(`ws://${location.hostname}:${process.env.WSPORT}${location.pathname}`, store)
Vue.prototype.$bus = bus
Vue.prototype.$lang = store.state.local.lang
Vue.prototype.$var = variables

Vue.mixin(upperFirstSymbol)
Vue.mixin(globalConfig)
Vue.mixin(gloss)

// app.mount('#app')

function mounting() {
  // eslint-disable-next-line
  if (window.sourceLoader.loadedNum !== window.sourceLoader.sourceNum) {
    setTimeout(mounting, 100)
  } else {
    app.mount('#app')
  }
}

mounting()
