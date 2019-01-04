<template>
  <div class="globalmap">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
    <button id="left" class="globalmap__move globalmap__move-left" type="button" @click="moveOnMap">left</button>
    <button id="top" class="globalmap__move globalmap__move-top" type="button" @click="moveOnMap">top</button>
    <button id="right" class="globalmap__move globalmap__move-right" type="button" @click="moveOnMap">right</button>
    <button id="bottom" class="globalmap__move globalmap__move-bottom" type="button" @click="moveOnMap">bottom</button>
  </div>
</template>

<script>
import { drawMap } from "../modules";
export default {
  name: "GlobalMap",
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: null,
      currentMap: []
    };
  },
  created() {},
  watch: {
    "$store.state.globalMap.currentMap": function() {
      this.currentMap = this.$store.state.globalMap.currentMap;
      this.drawMap();
    }
  },
  computed: {
    tileWidth() {
      const intermediate =
        parseInt(this.widthScene) / 2 / (this.currentMap.length / 2);
      return intermediate * 1.3
      // return intermediate / (this.currentMap.length / 2) + intermediate;
    },
    isoCoords() {
      const d = (this.tileWidth*this.currentMap.length)/2 //общая ширина всех ячеек /2
      const x = (parseInt(this.widthScene)/2) - d; //от середины карты вычитываем половину длины всех ячеек
      const y = parseInt(this.heightScene) / 2;
      return { x, y };
    }
  },
  methods: {
    drawMap,
    testDraw() {
      this.ctx.fillStyle = " #ff0000";
      this.ctx.fil1Rect(10, 10, 50, 50);
    },
    moveOnMap() {
      const target = event.target;
      const way = target.id;
      const message = {
        type: 'moveGlobalMap',
        way,
      }
      this.$ws.sendMessage(message)
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
  }
};
</script>

<style lang='scss' scoped>
@import "globalMap.scss";
</style>
