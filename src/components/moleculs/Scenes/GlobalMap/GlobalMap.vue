<template>
  <div class="globalmap">
    <Tooltip v-show="showTooltip && !popupTown.show" :mouseCoords="mouseCoords" :tile="currentTile"></Tooltip>
    <canvas
      id="global"
      ref="scene"
      :width="widthScene"
      :height="heightScene"
      @mousemove="handlerMousemoveOnMap"
      @mouseleave="hideTooltip"
      @click="handlerClickOnGlobalMap"
    ></canvas>
    <button
      id="left"
      class="globalmap__move globalmap__move-left"
      type="button"
      @click="moveOnMap"
    >left</button>
    <button
      id="top"
      class="globalmap__move globalmap__move-top"
      type="button"
      @click="moveOnMap"
    >top</button>
    <button
      id="right"
      class="globalmap__move globalmap__move-right"
      type="button"
      @click="moveOnMap"
    >right</button>
    <button
      id="bottom"
      class="globalmap__move globalmap__move-bottom"
      type="button"
      @click="moveOnMap"
    >bottom</button>
    <div class="zoom__wrap">
      <button id="zoom" class="zoom__btn" @click="changeZoom">{{zoomText}}</button>
    </div>
    <PopupTown
      v-if="popupTown.show"
      @close-popup="popupTown.show = !popupTown.show"
      :tileWidth="tileWidth"
      :tile="popupTown.tile"
      :initSector="popupTown.initSector"
    ></PopupTown>
  </div>
</template>

<script>
import Tooltip from '../../Tooltip';
import PopupTown from './modules/PopupTown';
import { currentSector } from '../../../mixins';
import drawHeroMixin from '../mixins/drawHeroMixin';
import baseMixins from '../mixins/baseMixins';
import { algebra } from '../../../../utils';
import { iso } from '../utils';
// import drawMoveHero from "./drawMoveHeroOnGlobalMap";

export default {
  name: 'GlobalMap',
  components: { Tooltip, PopupTown },
  mixins: [currentSector, drawHeroMixin, baseMixins],
  props: ['widthScene', 'heightScene'],
  data() {
    return {
      isDisabledMove: false,
      popupTown: {
        show: false,
        tile: null,
        initSector: null
      }
    };
  },
  created() {
    this.currentMap = this.$store.state.globalMap.currentMap;
    this.$bus.$on('rerender_global_map', this.drawMap);
  },
  beforeDestroy() {
    this.$bus.$off('rerender_global_map', this.drawMap);
  },
  watch: {
    '$store.state.globalMap.currentMap': function() {
      const { deepClone, $store } = this;
      this.currentMap = deepClone($store.state.globalMap.currentMap);
      this.isDisabledMove = false;
      this.drawMap();
      // this.setBorderIsoMap();
    },
    eventList: {
      deep: true,
      handler() {
        this.drawMap();
      }
    }
  },
  computed: {
    zoomText() {
      return this.zoom === 1 ? 'Zoom +' : 'Zoom - ';
    },
    zoom() {
      return this.$store.state.globalMap.zoom;
    },
    tileWidth() {
      const widthParse = parseInt(this.widthScene) / 2;
      const intermediate = widthParse / (this.currentMap.length / 2);
      return intermediate * 1.2;
      // return intermediate / (this.currentMap.length / 2) + intermediate;
    },
    isoCoords() {
      const x = parseInt(this.widthScene) / 2;
      const y = (parseInt(this.heightScene) / 100) * 10;
      return { x, y };
    },
    eventList() {
      const list = this.$store.state.timeline.eventsList;
      const { Event } = this.$store.state.globalConfig.all;
      const { deepClone } = this;
      const d = list.filter(item => {
        return item.mode === Event.mode.global || item.mode === Event.mode.hidden;
      });
      return deepClone(d);
    }
  },
  methods: {
    drawAnotherObjects() {
      this.drawMoveHero();
    },
    changeZoom(event) {
      this.$store.commit('CHANGE__ZOOM');
      this.moveOnMap(event);
    },
    moveOnMap(event) {
      if (this.isDisabledMove) return;
      this.isDisabledMove = true;
      const target = event.target;
      const way = target.id;
      const message = {
        type: 'moveGlobalMap',
        way,
        zoom: this.zoom
      };
      this.$ws.sendMessage(message);
    },
    handlerClickOnGlobalMap($event) {
      const tileTypes = this.globalConfig.all.WorldMap.types;
      const { currentTile, $store, deepClone, currentSector } = this;
      if (currentTile.type === tileTypes.empty.id) {
        const payload = {
          data: {
            targetTile: deepClone(currentTile),
            initSector: deepClone(currentSector)
          },
          type: 'worldMapRegion'
        };
        $store.commit('DIALOG_SHOW', payload);
      } else if (currentTile.type === tileTypes.town.id) {
        const { sectors } = $store.state.userSectors;
        const to_be = sectors.find(i => i._id === currentTile._id);
        if (to_be && to_be._id !== currentSector._id) {
          this.popupTown.show = true;
          this.popupTown.centerX = currentTile.centerX;
          this.popupTown.centerY = currentTile.centerY;
          this.popupTown.tile = deepClone(currentTile);
          this.popupTown.initSector = deepClone(currentSector);
        }
      }
    },
    drawMoveHero() {
      if (this.mode && this.mode !== 'global') return;
      const { ctx, eventList, currentMap, tileWidth, settings, getTileByCoords } = this;
      ctx.fillStyle = settings.baseColor;
      eventList.forEach(event => {
        const { target, init } = event;
        const startCoords = { x: init.x, y: init.y };
        const endCoords = { x: target.x, y: target.y };
        const WorldMap = this.globalConfig.all.WorldMap;
        const sizeMap = WorldMap.numSectionGlobalMap;
        const width = this.tileWidth;
        const height = width / 2;
        let startTile = getTileByCoords(currentMap, startCoords.x, startCoords.y);
        let endTile = getTileByCoords(currentMap, endCoords.x, endCoords.y);
        if (startTile && !endTile) {
          endTile = algebra.getMinPath(startTile, endCoords, sizeMap);
          iso.addCenterPoints(startTile, endTile, height);
        } else if (!startTile && endTile) {
          startTile = algebra.getMinPath(endTile, startCoords, sizeMap);
          iso.addCenterPoints(endTile, startTile, height);
        } else if (!startTile && !endTile) {
          startTile = algebra.getMinPath(currentMap[0][0], startCoords, sizeMap);
          endTile = algebra.getMinPath(startTile, endCoords, sizeMap);
          iso.addCenterPoints(currentMap[0][0], startTile, height);
          iso.addCenterPoints(startTile, endTile, height);
        }
        const baseCoords = [startTile.centerX, startTile.centerY, endTile.centerX, endTile.centerY];
        const fullLength = algebra.getStraightLength(...baseCoords);
        let heroLength = this.getLengthHeroOnStraight(fullLength, event.start, event.end);
        if (heroLength > fullLength) heroLength = fullLength;
        const step = tileWidth / 4;
        const color = this.$store.getters.getUserColor;
        ctx.fillStyle = color;
        for (let i = 0; i < fullLength + 1; i += step) {
          const coords = algebra.getPointOnStraight(...baseCoords, i);
          const { viewportPath } = this;
          const isPoint = ctx.isPointInPath(viewportPath, coords.x, coords.y);
          if (!isPoint) continue;
          ctx.beginPath();
          const r = i > heroLength ? 2 : 4;
          ctx.arc(coords.x, coords.y, r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();
        }
        const heroCoords = algebra.getPointOnStraight(...baseCoords, heroLength);
        this.drawHeroOnMap(ctx, heroCoords);
      });
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext('2d');
    this.drawMap();
    this.setBorderIsoMap();
  }
};
</script>

<style lang='scss'>
@import 'globalMap.scss';
</style>
