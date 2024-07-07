import { createApp } from 'vue'
import store from './store/index.js'
import Ws from './api/ws'
import EventBus from './api/EventBus.js'

// import './components/atoms'
import upperFirstSymbol from './components/mixins/upperFirstSymbol.js'
import globalConfig from './components/mixins/globalConfig.js'
import gloss from './components/mixins/glossary.js'

import variables from '../backend/variables/game_variables.js'

import App from './App.vue'
import router from './router'
import GlobalComponents from './components/atoms/index.js'
console.log(GlobalComponents)

const app = createApp(App)
Object.entries(GlobalComponents).forEach((item) => {
  app.component(item[0], item[1])
})

app.use(router)
app.use(store)

// Vue.config.productionTip = false
app.config.globalProperties.$ws = new Ws()
app.config.globalProperties.$ws.init(`ws://${location.hostname}:${4001}${location.pathname}`, store)
app.config.globalProperties.$bus = new EventBus()
app.config.globalProperties.$lang = store.state.local.lang
app.config.globalProperties.$var = variables

app.mixin(upperFirstSymbol)
app.mixin(globalConfig)
app.mixin(gloss)

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
