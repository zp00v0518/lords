<template>
  <main class="main">
    <Vheader></Vheader>
    <div class="main__content">
      <Scene></Scene>
      <Sidebar></Sidebar>
    </div>
    <chat></chat>
  </main>
</template>

<script>
import Chat from "../Chat";
import Vheader from "../Header";
import Sidebar from "../Sidebar";
import Scene from "../Scene";

export default {
  name: "Main",
  components: {
    Chat,
    Vheader,
    Sidebar,
    Scene,
  },
  watch: {
    "$store.state.chat.is": function() {
      const isChat = this.$store.state.chat.is;
      if (isChat) {
        this.$el.style.marginRight = "14%";
      } else {
        this.$el.style.marginRight = "0";
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "main.scss";
</style>
