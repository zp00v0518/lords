<script lang="ts">
import ChoicesRace from './components/organism/ChoicesRace'

export default {
  name: 'App',
  components: {
    ChoicesRace
  },
  created() {
    document.addEventListener('allLoad', this.handlerAllLoad)
  },
  data() {
    return {
      allLoad: false
    }
  },
  computed: {
    choicesHeroes() {
      return this.globalConfig?.choicesRace
    },
    isReady() {
      return this.$store?.state.settings.isReady
    }
  },
  methods: {
    handlerAllLoad() {
      this.allLoad = true
      // eslint-disable-next-line
      console.log(this)
      this.$store.commit('SET_GAME_SOURCES', window.sourceLoader.sources)
      document.removeEventListener('allLoad', this.handlerAllLoad)
    }
  }
}
</script>

<template>
  <div id="app">
    <template v-if="choicesHeroes">
      <ChoicesRace />
    </template>
    <template v-if="!choicesHeroes && allLoad && isReady">
      <router-view />
    </template>
  </div>
</template>

<style lang="sass">
@import 'app.scss'
</style>
