<template>
  <div class="globalmap">
    <Tooltip v-show="showTooltip" :mouseCoords="mouseCoords" :tile="currentTile"></Tooltip>
    <canvas
      ref="scene"
      :width="widthScene"
      :height="heightScene"
      @mousemove="handlerMousemoveOnMap"
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
    <div class="zoom__wrap">
      <button  id="zoom" class="zoom__btn" @click="changeZoom">{{zoomText}}</button>
    </div>
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
      cursorOnScene: false,
      ctx: null,
      currentMap: [],
      currentTile: {},
      borderIsoMap: {
        left: { x: 0, y: 0 },
        top: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
        bottom: { x: 0, y: 0 }
      },
      mouseCoords: { x: 0, y: 0 },
      zoom: 1,
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
    zoomText(){
      return this.zoom === 1 ? "Zoom +" : "Zoom - "
    },
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
    setBorderIsoMap,
    hideTooltip,
    handlerMousemoveOnMap,
    changeZoom(event) {
      this.zoom = this.zoom === 1 ? 2 : 1;
      this.moveOnMap(event)
    },
    moveOnMap(event) {
      const target = event.target;
      const way = target.id;
      const message = {
        type: "moveGlobalMap",
        way,
        zoom: this.zoom,
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
