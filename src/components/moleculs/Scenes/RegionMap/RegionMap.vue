<template>
  <div class="regionmap" ref="body">
    <TooltipRegion
      v-show="showTooltip"
      :mouseCoords="mouseCoords"
      :tile="currentTile"
      :mode="mode"
      key="tooltip"
    ></TooltipRegion>
    <canvas
      ref="scene"
      :width="sceneWidth"
      :height="sceneHeight"
      @mousemove="handlerMousemoveOnMap"
      @mouseleave="hideTooltip"
      @click="mode === 'dialog' ? {} : handlerClick()"
      key="scene"
      class="scene__canvas"
    ></canvas>
  </div>
</template>

<script>
import TooltipRegion from '../../TooltipRegion';
import { currentSector } from '../../../mixins';
import drawHeroMixin from '../mixins/drawHeroMixin';
import baseMixins from '../mixins/baseMixins';
import { algebra } from '../../../../utils';

export default {
  name: 'RegionMap',
  mixins: [currentSector, drawHeroMixin, baseMixins],
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
      sceneWidth: this.widthScene,
      sceneHeight: this.heightScene
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
        // this.setBorderIsoMap();
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
        if (item.data && item.data.typeBattle === b_types.region.name) {
          return item.type === e_types.battle || item.type === e_types.backToTown;
        }
      });
      return deepClone(d);
    },
    tileWidth() {
      const { ctx } = this;
      if (!ctx) return 0;
      const widthParse = parseInt(this.sceneWidth) / 2;
      const intermediate = widthParse / (this.currentMap.length / 2);
      return intermediate;
    },
    isoCoords() {
      const x = parseInt(this.sceneWidth) / 2;
      const y = parseInt(this.sceneHeight) / 100 * 10;
      return { x, y };
    }
  },
  methods: {
    handlerClick() {
      const { currentTile, globalConfig } = this;
      if (!this.cursorOnScene || currentTile.type === 1 || currentTile.type === 3) return;
      if (this.currentTile.type === 0) {
        if (currentTile.army && currentTile.army.length === 0) return;
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
      const nameRegion = globalConfig.all.Region.typeList[currentTile.type];
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
    drawAnotherObjects() {
      this.drawMoveHero();
    },
    setSizeScene() {
      const { body } = this.$refs;
      const styles = body.getBoundingClientRect();
      if (!this.widthScene) {
        this.sceneWidth = styles.width + 'px';
      }
      if (!this.heightScene) {
        this.sceneHeight = styles.height + 'px';
      }
    },
    drawMoveHero() {
      if (this.mode && this.mode !== 'global') return;
      const { ctx, eventList, currentMap, tileWidth, settings, getTileByCoords } = this;
      ctx.fillStyle = settings.baseColor;
      eventList.forEach(event => {
        const { data } = event;
        const { startCoords, endCoords } = data;
        const startTile = getTileByCoords(currentMap, startCoords.x, startCoords.y);
        const endTile = getTileByCoords(currentMap, endCoords.x, endCoords.y);
        const baseCoords = [startTile.centerX, startTile.centerY, endTile.centerX, endTile.centerY];
        const fullLength = algebra.getStraightLength(...baseCoords);
        let heroLength = this.getLengthHeroOnStraight(fullLength, event.start, event.end);
        if (heroLength > fullLength) heroLength = fullLength;
        const step = tileWidth / 4;
        const color = this.$store.getters.getUserColor;
        ctx.fillStyle = color;
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
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext('2d');
    this.$nextTick(() => {
      this.setSizeScene();
      this.setBorderIsoMap();
      requestAnimationFrame(this.drawMap);
    });
  }
};
</script>

<style lang="scss">
.regionmap {
  height: 100%;
}
</style>
