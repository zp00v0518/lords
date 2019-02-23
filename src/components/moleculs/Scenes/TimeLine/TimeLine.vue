<template>
  <div class="timeline" :style="{width: widthScene+'px', height:heightScene+'px'}">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
    <div class="event" :style="{left: position+'px'}"></div>
  </div>
</template>

<script>
import {
  formBreakpoint,
  drawBreakpointTime,
  drawDefaultTime,
  getPositionEvent,
  drawEventPoint
} from "./utils";
export default {
  name: "TimeLine",
  components: {},
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: {},
      breakpoint: [],
      intervalNumber: ""
    };
  },
  created() {},
  watch: {},
  computed: {
    position() {
      const now = new Date().getTime();
      const position = this.getPositionEvent(now, now + 1000 * 60 * 60 * 2.5);
      console.log(position);
      return position;
    }
  },
  methods: {
    formBreakpoint,
    drawBreakpointTime,
    drawDefaultTime,
    getPositionEvent,
    drawEventPoint,
    drawLoop() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawBreakpointTime(this.ctx, this.breakpoint);
      this.drawDefaultTime(this.ctx, this.breakpoint);

      this.drawEventPoint(this.position);

      // const position = this.getPositionEvent();
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
    this.breakpoint = this.formBreakpoint(
      this.breakpoint,
      parseFloat(this.widthScene)
    );
    this.drawLoop();
    this.intervalNumber = setInterval(() => {
      this.drawLoop();
    }, 1000 * 15);
  },
  beforeDestroy() {
    clearInterval(this.intervalNumber);
  }
};
</script>

<style lang='scss' scoped>
@import "timeline.scss";

.event {
  width: 20px;
  height: 20px;
  border: 1px solid;
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
}
</style>
