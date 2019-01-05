<template>
  <div class="regionmap">
    <TooltipRegion v-show="showTooltip" :mouseCoords="mouseCoords" :tile="currentTile"></TooltipRegion>
    <canvas
      ref="scene"
      :width="widthScene"
      :height="heightScene"
      @mousemove="handlerMousemoveOnGlobalMap"
      @mouseleave="hideTooltip"
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
  },
  watch: {
    "$store.state.regionMap.currentRegion": function() {
      this.currentMap = this.$store.state.regionMap.currentRegion;
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
      const x = 0
      const y = parseInt(this.heightScene) / 2;
      return { x, y };
    }
  },
  methods: {
    drawMap,
    getCursorPositionOnScene,
    checkMouseCoordsOnMap,
    getTileCoordsOnMap,
    drawHoverLine,
    handlerMousemoveOnGlobalMap(event) {
      this.mouseCoords = this.getCursorPositionOnScene(event);
      if (this.checkMouseCoordsOnMap()) {
        const rombIndex = this.getTileCoordsOnMap();
        if (this.currentTile !== this.currentMap[rombIndex.x][rombIndex.y]) {
          rombIndex.x = rombIndex.x > 4 ? 4 : rombIndex.x // костыль (лень править формулу)
          rombIndex.y= rombIndex.y > 4 ? 4 : rombIndex.y // костыль
          this.drawMap();
          this.drawHoverLine(rombIndex)
          this.currentTile = this.currentMap[rombIndex.x][rombIndex.y];
          this.showTooltip = true;
        }
      } else {
        this.hideTooltip();
      }
    },
    hideTooltip() {
      this.showTooltip = false;
      this.drawMap();
    },
    setBorderIsoMap() {
      const currentLength = this.currentMap.length;
      const height = this.tileWidth / 2;
      this.borderIsoMap.left.x = this.isoCoords.x;
      this.borderIsoMap.left.y = this.isoCoords.y;
      this.borderIsoMap.top.x =
        this.borderIsoMap.left.x + (this.tileWidth * currentLength) / 2;
      this.borderIsoMap.top.y =
        this.borderIsoMap.left.y - (height * currentLength) / 2;
      this.borderIsoMap.right.x =
        this.borderIsoMap.left.x + this.tileWidth * currentLength;
      this.borderIsoMap.right.y = this.borderIsoMap.left.y;
      this.borderIsoMap.bottom.x = this.borderIsoMap.top.x;
      this.borderIsoMap.bottom.y =
        this.borderIsoMap.left.y + (height * currentLength) / 2;
    },
    moveOnMap() {
      const target = event.target;
      const way = target.id;
      const message = {
        type: "moveGlobalMap",
        way
      };
      this.$ws.sendMessage(message);
    }
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
