<template>
  <div id="app">
    <template v-if="choicesHeroes">
      <ChoicesRace />
    </template>
    <template v-if="!choicesHeroes && allLoad">
      <router-view />
    </template>
  </div>
</template>

<script>
import ChoicesRace from "./components/organism/ChoicesRace";
export default {
  name: "App",
  components: {
    ChoicesRace
  },
  created() {
    document.addEventListener("allLoad", this.handlerAllLoad);
  },
  data() {
    return {
      allLoad: false
    };
  },
  computed: {
    choicesHeroes() {
      return this.globalConfig.choicesRace;
    }
  },
  methods: {
    handlerAllLoad() {
      this.allLoad = true;
    }
  }
};
</script>
<style lang="sass" scoped>
@import 'app.scss';
</style>

<style lang='scss'>
body {
  height: 100vh;
  width: 100vw;
  // overflow-y: hidden;
}
* {
  // box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: all 0.2s ease;
}
</style>
