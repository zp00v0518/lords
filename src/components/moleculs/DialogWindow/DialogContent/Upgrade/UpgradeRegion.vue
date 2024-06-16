<template src="./upgarde_template.html"></template>

<script>
import regionMixin from './mixin/regionMixin.vue'
import upgradeMixin from './mixin/upgradeMixin.vue'

export default {
  name: 'UpgradeRegion',
  mixins: [upgradeMixin, regionMixin]
}
</script>

<style lang="scss">
@import 'upgrade_style.scss';
</style>
