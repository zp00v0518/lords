<template>
  <div class="regionmap">
    <TooltipRegion v-show="showTooltip" :mouseCoords="mouseCoords" :tile="currentTile"></TooltipRegion>
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
} from "../modules";
import TooltipRegion from "../../TooltipRegion";

export default {
  name: "RegionMap",
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
    // this.currentMap = this.$store.state.regionMap.currentRegion;
    if (this.$store.state.towns.currentTown) {
     this.currentMap = this.$store.state.towns.currentTown.town.regionMap;
    }
  },
  watch: {
    // "$store.state.regionMap.currentRegion": function() {
    //   this.currentMap = this.$store.state.regionMap.currentRegion;
    //   this.drawMap();
    //   this.setBorderIsoMap();
    // },
     "$store.state.towns.currentTown.town.regionMap": function() {
      this.currentMap = this.$store.state.towns.currentTown.town.regionMap;;
      this.drawMap();
      this.setBorderIsoMap();
    }
  },
  computed: {
    tileWidth() {
      const widthParse = parseInt(this.widthScene) / 2;
      const intermediate = widthParse / (this.currentMap.length / 2);
      return intermediate;
      // return intermediate / (this.currentMap.length / 2) + intermediate;
    },
    isoCoords() {
      const x = 0;
      const y = parseInt(this.heightScene) / 2;
      return { x, y };
    },
    gloss(){
      return this.$store.state.local.dictionary;
    }
  },
  methods: {
    handlerClick() {
      if (!this.cursorOnScene || this.currentTile.type === 1 || this.currentTile.type === 0) return;
      const nameRegion = this.$region.typeList[this.currentTile.type];
      const building = this.currentTile.sector;
      const typeBuilding = building.type;
      const payload = {
        title: this.gloss[nameRegion].type[typeBuilding].name.txt,
        data: {
          building,
          x: this.currentTile.x,
          y: this.currentTile.y,
        },
        type: 'upgradeRegion',
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

<style lang='scss' scoped>
@import "regionMap.scss";
</style>
