import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    week: {
      mo: [{bt: 240, et: 779}],
      tu: [],
      we: [],
      th: [{bt: 240, et: 779}, {bt: 1140, et: 1319}],
      fr: [{bt: 660, et: 1019}],
      sa: [{bt: 0, et: 1439}],
      su: []
    },
    dayList: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
  },
  mutations: {
    changeDay (state, data) {
      if (data.flag === 'delAll') {
        state.week[data.day] = []
      } else if (data.flag === 'setAll') {
        state.week[data.day] = [{bt: 0, et: 1439}]
      }
    },
    addChoise (state, data) {
      for (let day in data) {
        state.week[day].push(data[day])
      }
    },
    clearWeek (state) {
      for (let day in state.week) {
        state.week[day] = []
      }
    }
  }
})

export default store
