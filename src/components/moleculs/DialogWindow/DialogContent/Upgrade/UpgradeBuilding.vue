<template src="./upgarde_template.html"></template>

<script>
import buildingMixin from './mixin/buildingMixin.vue'
import upgradeMixin from './mixin/upgradeMixin.vue'

export default {
  name: 'UpgradeBuilding',
  mixins: [upgradeMixin, buildingMixin]
}
</script>

<style lang="scss">
@import 'upgrade_style.scss';
</style>
