<template>
  <section v-if="$store.state.dialog.show" class="dialog__wrap">
    <div class="dialog" :style="{height, width}">
      <div class="dialog__header" v-if="title">
        <div class="dialog__title">{{title}}</div>
        <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
      </div>
      <components
        @set-height="setHeight"
        :is="$store.state.dialog.component"
        :data="$store.state.dialog.data"
      ></components>
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
    return {
      height: "90%",
      width: "90%"
    };
  },
  created() {
    document.addEventListener("keyup", this.handlerKeyup);
  },
  computed: {
    title() {
      return this.$store.state.dialog.title;
    }
  },
  methods: {
    handlerKeyup(event) {
      if (event.key !== "Escape") return;
      this.closeDialogWindow();
    },
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    },
    setHeight(e) {
      this.height = e.height;
      this.width = e.width;
    }
  },
  beforeDestroy() {
    document.removEventListener("keyup", this.handlerKeyup);
  }
};
</script>

<style lang='scss' scoped>
@import "dialog_window.scss";
</style>
