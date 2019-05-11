<template>
  <div class="small" @click="showChat">
    <div>{{messages}}</div>
  </div>
</template>

<script>
export default {
  name: "ChatSmall",
  data() {
    return {
      fixLength: 0
    };
  },
  created() {
    this.fixLength = this.$store.state.chat.messages.length;
    console.log(this.fixLength);
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages.length - this.fixLength;
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
