<template>
  <div class="tooltip">
    <div class="tooltip__player">Player:</div>
    <div class="tooltip__town">Town:</div>
    <div class="tooltip__coords">
      <div class="tooltip__coords-x">X:</div>
      <div class="tooltip__coords-y">Y:</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["sectorGlobalMap"],
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "tooltip.scss";
</style>
