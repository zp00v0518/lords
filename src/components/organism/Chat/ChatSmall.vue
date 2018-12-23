<template>
  <div class="small" @click="showChat">
    <div>{{messages.length}}</div>
  </div>
</template>

<script>
export default {
  name: "ChatSmall",
  data() {
    return {};
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    }
  },
  methods: {
    showChat() {
      this.$store.commit("CHANGE_CHAT");
    }
  }
};
</script>

<style lang='scss' scoped>
@import "chat.scss";
</style>
