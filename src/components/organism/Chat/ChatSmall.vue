<template>
  <div class="chat__small">
    <div @click="showChat">Y</div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
    };
  },
  methods: {
    showChat(){
      console.log(123)
       this.$store.commit('changeChat')
       this.$store.commit('closeChat')
    }
  }
};
</script>

<style lang='scss' scoped>
@import "chat.scss";
</style>
