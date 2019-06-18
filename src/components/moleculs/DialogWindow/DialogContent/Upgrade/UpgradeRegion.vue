<template src="./upgarde_template.html"></template>

<script>
import regionMixin from "./mixin/regionMixin";
import upgradeMixin from "./mixin/upgradeMixin";

export default {
  name: "UpgradeRegion",
  mixins: [upgradeMixin, regionMixin]
};
</script>

<style lang='scss' scoped>
@import "upgrade_style.scss";
</style>
