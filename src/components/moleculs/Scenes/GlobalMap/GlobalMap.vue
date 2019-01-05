<template>
  <div class="globalmap">
    <Tooltip v-show="showTooltip" :mouseCoords="mouseCoords" :tile="currentTile"></Tooltip>
    <canvas
      ref="scene"
      :width="widthScene"
      :height="heightScene"
      @mousemove="handlerMousemoveOnGlobalMap"
      @mouseleave="hideTooltip"
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
  </div>
</template>

<script>
import {
  drawMap,
  getCursorPositionOnScene,
  checkMouseCoordsOnMap,
  getTileCoordsOnMap,
  drawHoverLine
} from "../modules";
import Tooltip from "../../Tooltip";

export default {
  name: "GlobalMap",
  components: {
    Tooltip
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
    this.currentMap = this.$store.state.globalMap.currentMap;
  },
  watch: {
    "$store.state.globalMap.currentMap": function() {
      this.currentMap = this.$store.state.globalMap.currentMap;
      this.drawMap();
      this.setBorderIsoMap();
    }
  },
  computed: {
    tileWidth() {
      const widthParse = parseInt(this.widthScene) / 2;
      const intermediate = widthParse / (this.currentMap.length / 2);
      return intermediate * 1.4;
      // return intermediate / (this.currentMap.length / 2) + intermediate;
    },
    isoCoords() {
      const d = (this.tileWidth * this.currentMap.length) / 2; // общая ширина всех ячеек /2
      const x = parseInt(this.widthScene) / 2 - d; // от середины карты вычитываем половину длины всех ячеек
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
@import "globalMap.scss";
</style>
