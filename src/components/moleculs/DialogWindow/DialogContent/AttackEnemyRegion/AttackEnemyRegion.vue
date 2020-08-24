<template>
  <div class="attackEnemyRegion">
    <RegionMap
      :regionMap="data.targetTile.region"
      mode="dialog"
      :sectorInfo="{raceIndex: -1}"
      :customHoverFunc="customHoverFunc"
      @click="handlerClick"
    />
    <OkCancelBlock @ok="handleOk" @cancel="closeDialogWindow" :disabled="disabled" />
  </div>
</template>

<script>
import RegionMap from '../../../Scenes/RegionMap/RegionMap';
import OkCancelBlock from '../../../OkCancelBlock';
import { closeMixin } from '../../dialogMixin';
import drawRectAroundCenter from '../../../Scenes/utils/drawRectAroundCenter';

export default {
  name: 'AttackEnemyRegion',
  mixins: [closeMixin],
  components: { RegionMap, OkCancelBlock },
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      disabled: true,
      selected: [],
      isChoice: false
    };
  },
  methods: {
    customHoverFunc(ctx, map, tileWidth, tile) {
      const isCtx = ctx instanceof CanvasRenderingContext2D;
      ctx.canvas.style.cursor = 'pointer';
      if (!isCtx) {
        console.log('ctx arguments is not CanvasRenderingContext2D');
        return;
      }
      if (!tile && !this.isChoice) return;
      const styles = {
        strokeStyle: 'red',
        lineWidth: 3
      };
      this.selected = this.isChoice ? this.selected : this.getSectorsForDraw({ x: tile.x, y: tile.y }, map);
      this.selected.forEach(i => {
        drawRectAroundCenter(ctx, { x: i.centerX, y: i.centerY }, tileWidth / 2, styles);
      });
    },
    handleOk(e) {
      console.log(e);
    },
    handlerClick(event) {
      this.isChoice = !this.isChoice;
    },
    getSectorsForDraw(start, map) {
      const result = [];
      const startX = start.x;
      const startY = start.y;
      result.push(map[startX][startY]);
      const top = map[startX][startY - 1];
      const tileTypes = this.globalConfig.all.WorldMap.types;
      if (top && top.type !== tileTypes.town.id) result.push(top);
      const right = map[startX + 1] ? map[startX + 1][startY] : undefined;
      if (right && right.type !== tileTypes.town.id) result.push(right);
      const bottom = map[startX][startY + 1];
      if (bottom && bottom.type !== tileTypes.town.id) result.push(bottom);
      const left = map[startX - 1] ? map[startX - 1][startY] : undefined;
      if (left && left.type !== tileTypes.town.id) result.push(left);
      return result;
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
