<template>
  <div class="globalmap">
    <Tooltip v-show="showTooltip && !popupTown.show" :mouseCoords="mouseCoords" :tile="currentTile"></Tooltip>
    <canvas
      id="global"
      ref="scene"
      class="scene__canvas"
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
      :style="moveBtnCoords.left"
      @click="moveOnMap"
    >left</button>
    <button
      id="top"
      :style="moveBtnCoords.top"
      class="globalmap__move globalmap__move-top"
      type="button"
      @click="moveOnMap"
    >top</button>
    <button
      id="right"
      :style="moveBtnCoords.right"
      class="globalmap__move globalmap__move-right"
      type="button"
      @click="moveOnMap"
    >right</button>
    <button
      id="bottom"
      :style="moveBtnCoords.bottom"
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
      :targetSector="popupTown.targetSector"
    ></PopupTown>
    <GoTo />
  </div>
</template>

<script>
import Tooltip from '../../Tooltip';
import PopupTown from './modules/PopupTown';
import GoTo from './modules/GoTo';
import { currentSector } from '../../../mixins';
import drawHeroMixin from '../mixins/drawHeroMixin';
import baseMixins from '../mixins/baseMixins';
import { algebra } from '../../../../utils';
import { iso } from '../utils';

export default {
  name: 'GlobalMap',
  components: { Tooltip, PopupTown, GoTo },
  mixins: [currentSector, drawHeroMixin, baseMixins],
  props: ['widthScene', 'heightScene'],
  data() {
    return {
      isDisabledMove: false,
      popupTown: {
        show: false,
        targetSector: null
      },
      moveBtnCoords: {
        left: { top: 0, left: 0 },
        right: { top: 0, left: 0 },
        top: { top: 0, left: 0 },
        bottom: { top: 0, left: 0 }
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
      return intermediate * 0.9;
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
    },
    curUser() {
      return this.$store.state.user.user;
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
          this.popupTown.targetSector = deepClone(currentTile);
        }
      }
    },
    drawMoveHero() {
      if (this.mode && this.mode !== 'global') return;
      const { ctx, eventList, currentMap, tileWidth, settings, getTileByCoords, curUser } = this;
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
        const color = init.color;
        // console.log(`%c ${color}`, `background: ${color}`);
        ctx.fillStyle = color || curUser.color;
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
    },
    getMoveBtnPositions() {
      const { borderIsoMap, moveBtnCoords } = this;
      const { top, left, right, bottom } = borderIsoMap;
      let coords = addPXToCoords(algebra.getPointOnStraight(top.x, top.y, left.x, left.y, '50%'));
      moveBtnCoords.left.left = coords.x;
      moveBtnCoords.left.top = coords.y;
      coords = addPXToCoords(algebra.getPointOnStraight(top.x, top.y, right.x, right.y, '50%'));
      moveBtnCoords.top.left = coords.x;
      moveBtnCoords.top.top = coords.y;
      coords = addPXToCoords(algebra.getPointOnStraight(right.x, right.y, bottom.x, bottom.y, '50%'));
      moveBtnCoords.right.left = coords.x;
      moveBtnCoords.right.top = coords.y;
      coords = addPXToCoords(algebra.getPointOnStraight(bottom.x, bottom.y, left.x, left.y, '50%'));
      moveBtnCoords.bottom.left = coords.x;
      moveBtnCoords.bottom.top = coords.y;

      function addPXToCoords(obj) {
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          obj[key] = value + 'px';
        });
        return obj;
      }
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext('2d');
    this.drawMap();
    this.setBorderIsoMap();
    this.getMoveBtnPositions();
  }
};
</script>

<style lang='scss'>
.globalmap {
  position: relative;
  &__move {
    margin: 0;
    padding: 0;
    border: none;
    padding: 8px;
    position: absolute;
    cursor: pointer;
    font-weight: 600;
    min-width: 50px;
    border-radius: 5px;
    letter-spacing: 1px;
    @media (max-width: $tablet) {
      min-width: unset;
      padding: 5px;
    }
    @media (max-width: $tablet-small) {
      font-size: 10px;
    }
    &-bottom {
      transform: translateX(-100%) translateY(15%);
    }

    &-left {
      transform: translateX(-120%) translateY(-120%);
    }

    &-top {
      transform: translateX(25%) translateY(-100%);
    }

    &-right {
      transform: translateX(-10%) translateY(28%);
    }
  }
}
.zoom {
  &__wrap {
    position: absolute;
    bottom: 0;
    right: 15%;
    margin-bottom: 15px;
    @media (max-width: $tablet-small) {
      right: 5%;
    }
  }
  &__btn {
    padding: 3px;
    @media (max-width: $tablet-small) {
      font-size: 10px;
    }
  }
}
</style>
