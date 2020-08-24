<template>
  <div class="attackEnemyRegion">
    <RegionMap
      :regionMap="data.targetTile.region"
      mode="dialog"
      :sectorInfo="{raceIndex: -1}"
      :customHoverFunc="customHoverFunc"
    />
    <OkCancelBlock @ok="hnadlerOk" @cancel="handlerCancel" :disabled="disabled" />
  </div>
</template>

<script>
import RegionMap from '../../../Scenes/RegionMap/RegionMap';
import OkCancelBlock from '../../../OkCancelBlock';

export default {
  name: 'AttackEnemyRegion',
  components: { RegionMap, OkCancelBlock },
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      disabled: true
    };
  },
  methods: {
    customHoverFunc() {
      console.log(arguments);
    },
    handlerCancel(e) {
      console.log(e);
    },
    hnadlerOk(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
.attackEnemyRegion {
  height: 100%;
  display: flex;
  flex-direction: column;
  .regionmap {
    height: 70%;
    flex-grow: 2;
  }
}
</style>
