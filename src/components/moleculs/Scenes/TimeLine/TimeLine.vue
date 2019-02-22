<template>
  <div class="timeline" :style="{width: widthScene, height:heightScene }">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
  </div>
</template>

<script>
import {formBreakpoint} from "../modules";
export default {
  name: "TimeLine",
  components: {},
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: {},
      breakpoint: [],
    };
  },
  created() {
  },
  computed: {},
  methods: {
    formBreakpoint,
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
    this.breakpoint = this.formBreakpoint(this.breakpoint, this.ctx.canvas.width);
  }
};
</script>

<style lang='scss' scoped>
@import "timeline.scss";
</style>
