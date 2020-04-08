<template>
  <div class="worldmap-region">
    <div class="worldmap-region__title">
      <div class="worldmap-region__title--txt">Построить город?</div>
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
    <div class="worldmap-region__body" ref="body">
      <!-- <canvas ref="scene" @mousemove="handlerMousemoveOnMap"></canvas> -->
      <RegionMap :regionMap="data.targetTile.region" mode="dialog"></RegionMap>
    </div>
    <div class="worldmap-region__footer">
      <div class="worldmap-region__footer__price">
        <div class="worldmap-region__footer__price--item">
          <div class="worldmap-region__footer__price__resource">
            <div class="worldmap-region__footer__price__resource--icon">
              <!-- <img :src="'img/resources/'+item.resource+'.gif'" /> -->
            </div>
            <div class="worldmap-region__footer__price__resource--sum">dsfgsdfg</div>
          </div>
        </div>
        <div class="worldmap-region__footer__price--item">
          <div class="worldmap-region__footer__price__resource">
            <div class="text">dfgsdfg</div>
            <div class="value">safgdsfg</div>
          </div>
        </div>
      </div>

      <div class="worldmap-region__footer__gui">
        <GuiBtn type="ok" class="worldmap-region__footer__gui--btn" />
        <GuiBtn type="cancel" class="worldmap-region__footer__gui--btn" @click.native="getSourceForBuilding"/>
      </div>
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';
import RegionMap from '../../../Scenes/RegionMap/RegionMap';
import {
  drawMap,
  setBorderIsoMap,
  checkMouseCoordsOnMap,
  handlerMousemoveOnMap,
  getCursorPositionOnScene,
  hideTooltip,
  getTileCoordsOnMap,
  drawHoverLine
} from '../../../Scenes/utils';

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
      currentMap: this.data.targetTile.region,
      mouseCoords: { x: 0, y: 0 }
    };
  },
  created() {
    this.$emit('set-height', { height: '99%', width: '99%' });
  },
  computed: {},
  methods: {
    drawMap,
    setBorderIsoMap,
    checkMouseCoordsOnMap,
    handlerMousemoveOnMap,
    getCursorPositionOnScene,
    hideTooltip,
    getTileCoordsOnMap,
    drawHoverLine,
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
    },
    getSourceForBuilding() {
      const { Town } = this.globalConfig.all;
      console.log(Town.getSourceForNewTown());
    }
  },
  mounted() {
    // this.init();
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
    &--txt {
      flex-grow: 2;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
    }
  }
  &__body {
    flex-grow: 2;
    & canvas {
      // width: 100%;
      // height: 100%;
    }
  }
  &__tooltip {
    position: absolute;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    height: 15%;
    min-height: 100px;
    &__price {
      margin-bottom: 10px;
      display: flex;
    }
    &__gui {
      display: flex;
      justify-content: center;
      &--btn {
        margin: 15px;
      }
    }
  }
}
</style>
