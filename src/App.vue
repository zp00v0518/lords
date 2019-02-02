<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
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
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: all 0.2s ease;
  }
</style>
