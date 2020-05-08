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

<script>
import ChoicesRace from './components/organism/ChoicesRace';
export default {
  name: 'App',
  components: {
    ChoicesRace
  },
  created() {
    document.addEventListener('allLoad', this.handlerAllLoad);
  },
  data() {
    return {
      allLoad: false
    };
  },
  computed: {
    choicesHeroes() {
      return this.globalConfig.choicesRace;
    },
    isReady() {
      return this.$store.state.settings.isReady;
    }
  },
  methods: {
    handlerAllLoad() {
      this.allLoad = true;
      // eslint-disable-next-line
      this.$store.commit('SET_GAME_SOURCES', window.sourceLoader.sources);
      document.removeEventListener('allLoad', this.handlerAllLoad);
    }
  }
};
</script>
<style lang="sass">
@import 'app.scss'
</style>
