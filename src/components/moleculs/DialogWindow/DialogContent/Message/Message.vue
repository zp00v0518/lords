<template>
  <div class="upgrade">{{data.txt}}</div>
</template>

<script>
import glossary from "@/components/mixins/glossary.vue";

export default {
  name: "Message",
  mixins: [glossary],
  props: {
    data: Object
  },
  created() {
    this.$emit("set-height", {width: "50%", height: "50%"})
  },
  data() {
    return {};
  },
  methods: {
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    }
  },
  mounted () {
  }
};
</script>

<style lang='scss' scoped>
@import "message.scss";
</style>
