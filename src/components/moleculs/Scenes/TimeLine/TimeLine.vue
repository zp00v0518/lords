<template>
  <div class="timeline">
    sdzd
    <!-- <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas> -->
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  components: {},
  props: ["widthScene", "heightScene"],
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    // this.ctx = this.$refs.scene.getContext("2d");
  }
};
</script>

<style lang='scss' scoped>
@import "timeline.scss";
</style>
