<template>
  <div class="regionmap">
    <TooltipRegion
      v-show="showTooltip"
      :mouseCoords="mouseCoords"
      :tile="currentTile"
    ></TooltipRegion>
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
} from "../utils";
import TooltipRegion from "../../TooltipRegion";
import { currentSector } from "../../../mixins";

export default {
  name: "RegionMap",
  mixins: [currentSector],
  components: {
    TooltipRegion
  },
  props: ["widthScene", "heightScene"],
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
    this.currentMap = this.$store.state.regionMap.currentRegion;
    if (this.$store.state.userSectors.currentSector) {
      this.currentMap = this.$store.state.userSectors.currentSector.region;
    }
  },
  watch: {
    "currentSector.region": function(e) {
      const { deepClone } = this;
      this.currentMap = deepClone(e);
      this.drawMap();
      this.setBorderIsoMap();
    }
  },
  computed: {
    tileWidth() {
      const widthParse = parseInt(this.widthScene) / 2;
      const intermediate = widthParse / (this.currentMap.length / 2);
      return intermediate;
    },
    isoCoords() {
      const x = 0;
      const y = parseInt(this.heightScene) / 2;
      return { x, y };
    },
    gloss() {
      return this.$store.state.local.dictionary;
    }
  },
  methods: {
    handlerClick() {
      const {currentTile} = this;
      if (!this.cursorOnScene || currentTile.type === 1) return;
      if (this.currentTile.type === 0) {
        if (currentTile.army && currentTile.army.length === 0) return;
        console.log(currentTile);
        // const nameRegion = this.$region.typeList[currentTile.type];
        const payload = {
          title: "svxzv",
          data: {
            defenseArmy: currentTile.army,
            target: 'region',
            tile: currentTile
          },
          type: "dialogBattle"
        };
        this.$store.commit("DIALOG_SHOW", payload);
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
        type: "upgradeRegion"
      };
      this.$store.commit("DIALOG_SHOW", payload);
    },
    drawMap,
    getCursorPositionOnScene,
    checkMouseCoordsOnMap,
    getTileCoordsOnMap,
    drawHoverLine,
    setBorderIsoMap,
    hideTooltip,
    handlerMousemoveOnMap
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
    this.drawMap();
    this.setBorderIsoMap();
  }
};
</script>

<style lang="scss" scoped>
@import "regionMap.scss";
</style>
