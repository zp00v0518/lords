<template>
  <div class="timeline" :style="{width: widthScene, height:heightScene }">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  components: {},
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: {},
    };
  },
  created() {},
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
    console.log(this.ctx)
  }
};
</script>

<style lang='scss' scoped>
@import "timeline.scss";
</style>
