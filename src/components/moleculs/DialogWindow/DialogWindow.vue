<template>
  <section v-if="$store.state.dialog.show" class="dialog__wrap">
    <div class="dialog">
      <div class="dialog__header">
        <div class="dialog__title">{{$store.state.dialog.title}}</div>
        <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
      </div>
      <components :is="$store.state.dialog.component" :data="$store.state.dialog.data"></components>
    </div>
  </section>
</template>

<script>
import DialogContent from "./DialogContent";

export default {
  name: "DialogWindow",
  props: [],
  components: { ...DialogContent },
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

<style lang='scss' scoped>
@import "dialog_window.scss";
</style>
