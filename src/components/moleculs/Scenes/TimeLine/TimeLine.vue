<template>
  <div class="timeline" :style="{width: widthScene+'px', height:heightScene+'px'}">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
    <div class="event" v-if="position" :style="{left: position+'px'}"></div>
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
      intervalNumber: "",
      timeEvent: '',
      eventsList: [],
    };
  },
  created() {},
  watch: {
    "$store.state.timeline.eventsList": function() {
      this.eventsList = this.$store.state.timeline.eventsList;
    }
  },
  computed: {
    position() {
      const now = new Date().getTime();
      const position = this.getPositionEvent(now, this.timeEvent);
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
  width: 15px;
  height: 15px;
  border: 1px solid;
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
}
</style>
