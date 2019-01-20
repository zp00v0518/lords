<template>
  <section v-if="$store.state.dialog.show" class="dialog">
    <div class="dialog__header">
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
  </section>
</template>

<script>
export default {
  name: "DialogWindow",
  props: [],
  data() {
    return {
      showComponent: true,
    };
  },
  methods: {
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    }
  }
};
</script>

<style lang='scss' scoped>
@import "dialog_window.scss";
</style>
