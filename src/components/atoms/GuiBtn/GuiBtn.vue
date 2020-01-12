<template>
  <div class="guibtn">
    <div v-if="type === 'ok'">
      Ok
    </div>
    <div v-if="type === 'cancel'">
      cancel
    </div>
  </div>
</template>

<script>
export default {
  name: "GuiBtn",
  props: {
    type: { type: String, default: "cancel" }
  }
};
</script>

<style lang="scss"></style>
