<template>
  <main class="main">
    <chat></chat>
  </main>
</template>

<script>
import Chat from "../Chat/Chat";
import Chatsmall from "../Chat/ChatSmall";
export default {
  name: "Main",
  components: {
    Chat,
    Chatsmall
  },
  watch: {
    "$store.state.chat.is": function() {
      const isChat = this.$store.state.chat.is;
      if (isChat) {
        this.$el.style.marginRight = "20%";
      } else {
        this.$el.style.marginRight = "0";
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "main.scss";
</style>
