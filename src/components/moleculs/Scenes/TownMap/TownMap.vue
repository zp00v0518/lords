<template>
  <div class="townmap">
    <canvas v-show="currentTown" ref="scene" :width="widthScene" :height="heightScene"></canvas>
  </div>
</template>

<script>
import Tooltip from "../../Tooltip";
import drawtown from "./drawTown";
import drawBaseImg from "./utils/drawBaseImg";

export default {
  name: "TownMap",
  components: {
    Tooltip
  },
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: null,
      races: this.$store.state.globalConfig.races
    };
  },
  created() {
    // eslint-disable-next-line
    console.log(sourceLoader);
  },
  watch: {},
  computed: {
    currentTown() {
      return this.$store.state.userSectors.currentSector;
    },
    raceTownIndex() {
      const currentTown = this.currentTown;
      return currentTown.town.race;
    },
    raceName() {
      const index = this.raceTownIndex;
      const races = this.$store.state.globalConfig.races;
      return races.typeList[this.raceTownIndex];
    }
  },
  methods: {
    drawtown
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
    this.drawtown();
    drawBaseImg(
      this.ctx,
      sourceLoader.sources.towns[this.raceName],
      this.raceName
    );
  }
};
</script>

<style lang='scss' scoped>
</style>
