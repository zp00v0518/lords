<template>
  <div class="worldmap-region">
    <div class="worldmap-region__title">
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
    <div class="worldmap-region__body" ref="body">
      <canvas ref="scene"></canvas>
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';
import RegionMap from '../../../Scenes/RegionMap/RegionMap';
import { drawMap, setBorderIsoMap } from '../../../Scenes/utils';

export default {
  name: 'WorldMapRegion',
  components: { RegionMap },
  mixins: [closeMixin],
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      borderIsoMap: {
        left: { x: 0, y: 0 },
        top: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
        bottom: { x: 0, y: 0 }
      },
      ctx: null,
      isoCoords: { x: 0, y: 0 },
      tileWidth: 32,
      currentMap: this.data.targetTile.region
    };
  },
  created() {
    console.log(this.data);
    this.$emit('set-height', { height: '99%', width: '99%' });
  },
  computed: {},
  methods: {
    drawMap,
    setBorderIsoMap,
    init() {
      this.ctx = this.$refs.scene.getContext('2d');
      this.setSizeScene();
      this.isoCoords.y = this.ctx.canvas.height / 2;
      this.tileWidth = this.getTileWidth();
      this.setBorderIsoMap();
      this.drawMap();
    },
    setSizeScene() {
      const { ctx, $refs } = this;
      const { body } = $refs;
      const styles = body.getBoundingClientRect();
      ctx.canvas.width = styles.width;
      ctx.canvas.height = styles.height;
    },
    getTileWidth() {
      const { ctx, currentMap } = this;
      const width = parseInt(ctx.canvas.width) / 2;
      const tileWidth = width / (currentMap.length / 2);
      return tileWidth;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.worldmap-region {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__title {
    display: flex;
    justify-content: flex-end;
  }
  &__body {
    flex-grow: 2;
    & canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
