import Vuex from 'vuex'
import { createApp } from 'vue'
import store from './store'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Vuex)
app.use(router)
app.use(store)

app.mount('#app')
