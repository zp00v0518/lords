<template>
  <div id="app">
    <ChoicesRace v-if="choicesHeroes" />
    <router-view v-if="!choicesHeroes && allLoad && isReady" />
  </div>
</template>

<script>
import ChoicesRace from './components/organism/ChoicesRace/ChoicesRace.vue';

export default {
  name: 'App',
  components: {
    ChoicesRace,
  },
  created() {
    document.addEventListener('allLoad', this.handlerAllLoad);
  },
  data() {
    return {
      allLoad: false,
    };
  },
  computed: {
    choicesHeroes() {
      return this.globalConfig?.choicesRace;
    },
    isReady() {
      return this.$store?.state.settings.isReady;
    },
  },
  methods: {
    handlerAllLoad() {
      this.allLoad = true;
      // eslint-disable-next-line
      this.$store.commit('SET_GAME_SOURCES', window.sourceLoader.sources);
      document.removeEventListener('allLoad', this.handlerAllLoad);
      console.log(this.$store.state.globalConfig);
      // console.log(this.$store.state.gameSources);
    },
  },
};
</script>

<style lang="sass">
@import 'app.scss'
</style>
