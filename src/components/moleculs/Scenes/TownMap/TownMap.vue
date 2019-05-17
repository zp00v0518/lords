<template>
  <div class="townmap">
    <canvas v-show="currentTown" ref="scene" :width="widthScene" :height="heightScene"></canvas>
  </div>
</template>

<script>
import Tooltip from "../../Tooltip";
import drawtown from "./drawTown";
import drawBaseImg from "./utils/drawBaseImg";
import formCurrentImageList from "./formCurrentImageList";

export default {
  name: "TownMap",
  components: {
    Tooltip
  },
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: null,
      races: this.$store.state.globalConfig.races,
      count: 0
    };
  },
  created() {
    console.log(sourceLoader);
  },
  watch: {},
  computed: {
    currentTown() {
      return this.$store.state.userSectors.currentSector;
    },
    raceTownIndex() {
      return this.currentTown.town.race;
    },
    raceName() {
      return this.races.typeList[this.raceTownIndex];
    }
  },
  watch: {
    currentTown: function() {
      if (this.count === 0) {
        this.count++;
        const arrImgBuilding = formCurrentImageList(
          this.currentTown,
          this.raceName,
          this.$store.state.globalConfig
        );
        this.drawtown(arrImgBuilding);
      }
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
