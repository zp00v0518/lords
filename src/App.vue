<template>
  <div id="app">
    <template v-if="choicesHeroes">
      <ChoicesHeroes />
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import ChoicesHeroes from "./components/organism/ChoicesHeroes";
export default {
  name: "App",
  components: {
    ChoicesHeroes
  },
  computed: {
    choicesHeroes() {
      return this.globalConfig.choiceHeroes;
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
