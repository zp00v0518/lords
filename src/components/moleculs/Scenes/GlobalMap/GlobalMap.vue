<template>
  <div class="globalmap">
    <Tooltip v-show="showTooltip" :mouseCoords="mouseCoords" :tile="currentTile"></Tooltip>
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
  </div>
</template>

<script>
import Tooltip from '../../Tooltip';
import { currentSector } from '../../../mixins';
import drawHeroMixin from '../mixins/drawHeroMixin';
import baseMixins from '../mixins/baseMixins';
import { algebra } from '../../../../utils';

export default {
  name: 'GlobalMap',
  components: { Tooltip },
  mixins: [currentSector, drawHeroMixin, baseMixins],
  props: ['widthScene', 'heightScene'],
  data() {
    return {};
  },
  created() {
    this.currentMap = this.$store.state.globalMap.currentMap;
  },
  watch: {
    '$store.state.globalMap.currentMap': function() {
      const { deepClone, $store } = this;
      this.currentMap = deepClone($store.state.globalMap.currentMap);
      this.drawMap();
      // this.setBorderIsoMap();
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
      const e_types = Event.types;
      console.log();
      const d = list.filter(item => {
        return item.type === e_types.buildNewTown;
      });
      return deepClone(d);
    }
  },
  methods: {
    drawAnotherObjects() {
      this.drawMoveHero();
    },
    changeZoom(event) {
      // this.zoom = this.zoom === 1 ? 1.5 : 1;
      this.$store.commit('CHANGE__ZOOM');
      this.moveOnMap(event);
    },
    moveOnMap(event) {
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
      const { currentTile } = this;
      if (currentTile.type === tileTypes.empty.id) {
        const payload = {
          data: {
            targetTile: this.deepClone(currentTile)
          },
          type: 'worldMapRegion'
        };
        this.$store.commit('DIALOG_SHOW', payload);
      }
    },
    drawMoveHero() {
      if (this.mode && this.mode !== 'global') return;
      const { ctx, eventList, currentMap, tileWidth, settings } = this;
      // console.log(currentMap[0][0])
      ctx.fillStyle = settings.baseColor;
      eventList.forEach(event => {
        const { data } = event;
        const { startCoords, endCoords } = data;
        const WorldMap = this.globalConfig.all.WorldMap;
        const sizeMap = WorldMap.numSectionGlobalMap;
        const width = this.tileWidth;
        const height = width / 2;
        const startTile = algebra.getNearCoords(currentMap[0][0], startCoords, sizeMap, { width, height });
        const endTile = algebra.getNearCoords(currentMap[0][0], endCoords, sizeMap, { width, height });

        // console.log(startTile, endTile)
        const baseCoords = [startTile.centerX, startTile.centerY, endTile.centerX, endTile.centerY];
        const fullLength = algebra.getStraightLength(...baseCoords);
        let heroLength = this.getLengthHeroOnStraight(fullLength, event.start, event.end);
        if (heroLength > fullLength) heroLength = fullLength;
        const step = tileWidth / 4;
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
