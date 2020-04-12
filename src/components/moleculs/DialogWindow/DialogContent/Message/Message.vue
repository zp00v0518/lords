<template>
  <div class="message">
    <div class="message__content">{{data.txt}}</div>
    <div class="message__answer">
      <div class="ok" @click="closeDialogWindow">OK</div>
    </div>
  </div>
</template>

<script>
// import glossary from "@/components/mixins/glossary.vue";

export default {
  name: "Message",
  // mixins: [glossary],
  props: {
    data: Object
  },
  created() {
    this.$emit("set-height", { width: "50%", height: "50%" });
  },
  data() {
    return {};
  },
  methods: {
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    }
  }
};
</script>

<style lang='scss'>
@import "message.scss";
</style>
