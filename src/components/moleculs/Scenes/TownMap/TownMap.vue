<template>
  <div class="townmap">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
  </div>
</template>

<script>
import Tooltip from "../../Tooltip";
import castle from "./utils/Castles";
console.log(castle)

export default {
  name: "TownMap",
  components: {
    Tooltip
  },
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: null
    };
  },
  created() {
    // eslint-disable-next-line
    console.log(sourceLoader);
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
  }
};
</script>

<style lang='scss' scoped>
</style>
