<template>
  <div class="timeline" :style="{width: widthScene+'px', height:heightScene+'px'}">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
  </div>
</template>

<script>
import {
  formBreakpoint,
  drawBreakpointTime,
  drawDefaultTime
} from "../modules";
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
  computed: {},
  methods: {
    formBreakpoint,
    drawBreakpointTime,
    drawDefaultTime,
    drawLoop() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawBreakpointTime(this.ctx, this.breakpoint);
      this.drawDefaultTime(this.ctx, this.breakpoint);
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
</style>
