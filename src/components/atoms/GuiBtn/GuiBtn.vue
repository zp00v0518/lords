<template>
  <div class="guibtn">
    <component :is="type + 'Btn'" :disabled="disabled" @click.native="$emit('click', $event)"></component>
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
  }
};
</script>

<style lang="scss">
.guibtn{
  cursor: pointer;
}
</style>
