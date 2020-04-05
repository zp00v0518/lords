<template src="./upgarde_template.html"></template>

<script>
import buildingMixin from "./mixin/buildingMixin";
import upgradeMixin from "./mixin/upgradeMixin";

export default {
  name: "UpgradeBuilding",
  mixins: [upgradeMixin, buildingMixin]
};
</script>

<style lang='scss'>
@import "upgrade_style.scss";
</style>
