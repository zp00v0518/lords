<template>
  <div class="guibtn">
    <component
      :is="type + 'Btn'"
      :disabled="disabled"
      @click.native="handlerClick"
    ></component>
  </div>
</template>

<script>
import modules from "./modules";

export default {
  name: "GuiBtn",
  components: { ...modules },
  props: {
    type: { type: String, default: "cancel" },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    handlerClick(event) {
      if (this.disabled) return;
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss">
.guibtn {
  cursor: pointer;
}
</style>
