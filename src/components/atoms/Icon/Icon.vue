<template>
  <i :class="'icon-' + name"></i>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String
  }
};
</script>

<style lang='scss' scoped>
@import "./icon.scss";
</style>
