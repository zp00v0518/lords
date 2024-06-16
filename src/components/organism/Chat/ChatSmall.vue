<template>
  <div class="small" @click="showChat" :style="styles">
    <div>{{messages}}</div>
  </div>
</template>

<script>
export default {
  name: 'ChatSmall',
  props: {
    isFullpage: { type: Boolean, default: false }
  },
  data() {
    return {
      fixLength: 0
    };
  },
  created() {
    this.fixLength = this.$store.state.chat.messages.length;
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages.length - this.fixLength;
    },
    styles() {
      const { isFullpage } = this;
      if (isFullpage) {
        return {
          right: 0,
          transform: 'unset'
        };
      }
    }
  },
  methods: {
    showChat() {
      this.$store.commit('CHANGE_CHAT');
    }
  }
};
</script>

<style lang='scss'>
@import 'chat.scss';
</style>
