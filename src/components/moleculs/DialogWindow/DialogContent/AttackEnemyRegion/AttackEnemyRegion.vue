<template>
  <div class="attackEnemyRegion">
    <RegionMap
      :regionMap="data.targetTile.region"
      mode="dialog"
      :sectorInfo="{raceIndex: -1}"
      :customHoverFunc="customHoverFunc"
    />
    <OkCancelBlock @ok="hnadlerOk" @cancel="closeDialogWindow" :disabled="disabled" />
  </div>
</template>

<script>
import RegionMap from '../../../Scenes/RegionMap/RegionMap';
import OkCancelBlock from '../../../OkCancelBlock';
import { closeMixin } from '../../dialogMixin';

export default {
  name: 'AttackEnemyRegion',
  mixins: [closeMixin],
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
    customHoverFunc(ctx) {
      const isCtx = ctx instanceof CanvasRenderingContext2D;
      if (!isCtx) {
        console.log('ctx arguments is not CanvasRenderingContext2D');
        return;
      }
      console.log(arguments);
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
