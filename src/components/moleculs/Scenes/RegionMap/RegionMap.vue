<template>
  <div class="regionmap" ref="body">
    <TooltipRegion v-show="showTooltip" :mouseCoords="mouseCoords" :tile="currentTile" :mode="mode"></TooltipRegion>
    <canvas
      ref="scene"
      :width="widthScene"
      :height="heightScene"
      @mousemove="handlerMousemoveOnMap"
      @mouseleave="hideTooltip"
      @click="handlerClick"
    ></canvas>
  </div>
</template>

<script>
import {
  drawMap,
  getCursorPositionOnScene,
  checkMouseCoordsOnMap,
  getTileCoordsOnMap,
  drawHoverLine,
  setBorderIsoMap,
  hideTooltip,
  handlerMousemoveOnMap
} from '../utils';
import TooltipRegion from '../../TooltipRegion';
import { currentSector } from '../../../mixins';
import { algebra } from '../../../../utils';

export default {
  name: 'RegionMap',
  mixins: [currentSector],
  components: {
    TooltipRegion
  },
  props: {
    widthScene: 0,
    heightScene: 0,
    regionMap: null,
    mode: { type: String, default: 'global' }
  },
  data() {
    return {
      showTooltip: false,
      ctx: null,
      cursorOnScene: false,
      currentMap: [],
      currentTile: {},
      borderIsoMap: {
        left: { x: 0, y: 0 },
        top: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
        bottom: { x: 0, y: 0 }
      },
      mouseCoords: { x: 0, y: 0 }
    };
  },
  created() {
    if (!this.regionMap) {
      this.currentMap = this.$store.state.regionMap.currentRegion;
      if (this.$store.state.userSectors.currentSector) {
        this.currentMap = this.$store.state.userSectors.currentSector.region;
      }
    } else {
      this.currentMap = this.regionMap;
    }
  },
  watch: {
    'currentSector.region': function(e) {
      if (this.mode === 'global') {
        const { deepClone } = this;
        this.currentMap = deepClone(e);
        this.drawMap();
        this.setBorderIsoMap();
      }
    },
    eventList: {
      deep: true,
      handler() {
        if (this.mode === 'global') {
          this.drawMap();
        }
      }
    }
  },
  computed: {
    eventList() {
      const list = this.$store.state.timeline.eventsList;
      const { Battle, Event } = this.$store.state.globalConfig.all;
      const { deepClone } = this;
      const b_types = Battle.types;
      const e_types = Event.types;
      const d = list.filter(item => {
        if (item.data.typeBattle === b_types.region.name) {
          return item.type === e_types.battle || item.type === e_types.backToTown;
        }
      });
      return deepClone(d);
    },
    settings() {
      return this.$store.state.settings;
    },
    tileWidth() {
      const { ctx } = this;
      if (!ctx) return 0;
      const widthParse = ctx.canvas.width / 2;
      const intermediate = widthParse / (this.currentMap.length / 2);
      return intermediate;
    },
    isoCoords() {
      const { ctx } = this;
      const x = 0;
      if (!ctx) return { x, y: 0 };
      const y = ctx.canvas.height / 2;
      return { x, y };
    },
    gloss() {
      return this.$store.state.local.dictionary;
    }
  },
  methods: {
    handlerClick() {
      const { currentTile } = this;
      if (!this.cursorOnScene || currentTile.type === 1 || currentTile.type === 3) return;
      if (this.currentTile.type === 0) {
        if (currentTile.army && currentTile.army.length === 0) return;
        console.log(currentTile);
        // const nameRegion = this.$region.typeList[currentTile.type];
        const payload = {
          title: 'Настройка битвы',
          data: {
            defenseArmy: currentTile.army,
            target: 'region',
            tile: currentTile
          },
          type: 'dialogBattle'
        };
        this.$store.commit('DIALOG_SHOW', payload);
        return;
      }
      const nameRegion = this.$region.typeList[currentTile.type];
      const building = currentTile.sector;
      const typeBuilding = building.type;
      const payload = {
        title: this.gloss[nameRegion].type[typeBuilding].name.txt,
        data: {
          building,
          x: currentTile.x,
          y: currentTile.y
        },
        type: 'upgradeRegion'
      };
      this.$store.commit('DIALOG_SHOW', payload);
    },
    drawMap,
    getCursorPositionOnScene,
    checkMouseCoordsOnMap,
    getTileCoordsOnMap,
    drawHoverLine,
    setBorderIsoMap,
    hideTooltip,
    handlerMousemoveOnMap,
    drawAnotherObjects() {
      this.drawMoveHero();
    },
    drawMoveHero() {
      const { ctx, eventList, currentMap, tileWidth, settings } = this;
      ctx.fillStyle = settings.baseColor;
      eventList.forEach(event => {
        const { data } = event;
        const { startCoords, endCoords } = data;
        const startTile = currentMap[startCoords.x][startCoords.y];
        const endTile = currentMap[endCoords.x][endCoords.y];
        const baseCoords = [startTile.centerX, startTile.centerY, endTile.centerX, endTile.centerY];
        const fullLength = algebra.getStraightLength(...baseCoords);
        let heroLength = this.getLengthHeroOnStraight(fullLength, event.start, event.end);
        if (heroLength > fullLength) heroLength = fullLength;
        const step = tileWidth / 4;
        for (let i = 0; i < fullLength + 1; i += step) {
          const coords = algebra.getPointOnStraight(...baseCoords, i);
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
    getLengthHeroOnStraight(length, startTime, endTime) {
      const fullTime = endTime - startTime;
      const passTime = Date.now() - startTime;
      const dif = passTime / fullTime;
      return length * dif;
    },
    drawHeroOnMap(ctx, coords) {
      const heightFlag = 20;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(coords.x, coords.y - heightFlag);
      ctx.lineTo(coords.x + heightFlag / 2, coords.y - heightFlag + heightFlag / 4);
      ctx.lineTo(coords.x, coords.y - heightFlag / 2);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    },
    setSizeScene(ctx) {
      const { body } = this.$refs;
      const styles = body.getBoundingClientRect();
      if (!this.widthScene) {
        ctx.canvas.width = styles.width;
      }
      if (!this.heightScene) {
        ctx.canvas.height = styles.height;
      }
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext('2d');
    this.setSizeScene(this.ctx);
    this.drawMap();
    this.setBorderIsoMap();
  }
};
</script>

<style lang="scss">
.regionmap {
  height: 100%;
}
</style>
