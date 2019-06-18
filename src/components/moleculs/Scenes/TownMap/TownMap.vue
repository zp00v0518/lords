<template>
  <div class="townmap">
    <canvas
      v-show="currentTown"
      ref="scene"
      :width="widthScene"
      :height="heightScene"
      @mousemove="handlerMouseMove"
      @click="handlerClick"
    ></canvas>
    <Building
      v-if="component.is"
      :name="component.name"
      @close="component.is  = false"
      :townRaceName="townRaceName"
      :currentTown="currentTown"
    ></Building>
  </div>
</template>

<script>
import Tooltip from "../../Tooltip";
import { getCursorPositionOnScene } from "../utils";
import {
  formCurrentImageList,
  drawTown,
  checkElemUnderMouse
} from "./utils_town";
import Building from "./Building";

export default {
  name: "TownMap",
  components: {
    Tooltip,
    Building
  },
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: null,
      helperCtx: document.createElement("canvas").getContext("2d"),
      races: this.$store.state.globalConfig.races,
      count: 0,
      WIDTH: 800,
      HEIGHT: 374,
      scale_X: 1, // масштаб, по отношени. к базовым размерам
      scale_Y: 1,
      arrDrawImg: [],
      mouseCoords: null,
      hover: null,
      component: {
        is: false,
        name: ""
      }
    };
  },
  created() {
    this.helperCtx.canvas.width = parseFloat(this.widthScene);
    this.helperCtx.canvas.height = parseFloat(this.heightScene);
    // document.body.appendChild(this.helperCtx.canvas);
  },
  computed: {
    currentTown() {
      return this.$store.state.userSectors.currentSector;
    },
    raceTownIndex() {
      return this.currentTown.town.race;
    },
    townRaceName() {
      return this.races.typeList[this.raceTownIndex];
    }
  },
  watch: {
    currentTown: function() {
      if (this.count === 0) {
        this.count++;
        this.arrDrawImg = formCurrentImageList.call(
          this,
          this.currentTown,
          this.townRaceName,
          this.$store.state.globalConfig
        );
        this.drawTown(this.arrDrawImg);
      }
    }
  },
  methods: {
    drawTown,
    getCursorPositionOnScene,
    handlerMouseMove(event) {
      this.mouseCoords = this.getCursorPositionOnScene(event);
      this.hover = checkElemUnderMouse(
        this.mouseCoords.x,
        this.mouseCoords.y,
        this.arrDrawImg,
        this.helperCtx,
        this.scale_X,
        this.scale_Y
      );
      this.drawTown(this.arrDrawImg);
      this.ctx.canvas.style.cursor = this.hover ? "pointer" : "default";
    },
    handlerClick(event) {
      // const mouseCoords = this.getCursorPositionOnScene(event);
      if (this.hover) {
        this.component.name = this.hover.class;
        this.component.is = true;
      }
      // this.ctx.beginPath();
      // this.ctx.arc(mouseCoords.x, mouseCoords.y, 2, 0, 2 * Math.PI);
      // this.ctx.fill();
      // this.ctx.closePath();
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
    this.scale_X = this.ctx.canvas.width / this.WIDTH;
    this.scale_Y = this.ctx.canvas.height / this.HEIGHT;
    this.drawTown();
  }
};
</script>

<style lang='scss' scoped>
</style>
