<template>
  <section class="sidebar">
    <Town
      v-for="(sector, index) in sectorsState"
      :indexTown="index"
      :key="index"
      :sector="sector"
    ></Town>
  </section>
</template>

<script>
import Town from "../../moleculs/Town";
import { currentSector } from "../../mixins";

export default {
  name: "Sidebar",
  mixins: [currentSector],
  components: {
    Town
  },
  data() {
    return {
      sectorsState: this.$store.state.userSectors.sectors,
    }
  },
  // computed: {
  //   sectorsState() {
  //     return this.$store.state.userSectors.sectors;
  //   }
  // },
  watch: {
    currentSector: function(){
      this.sectorsState = this.$store.state.userSectors.sectors;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "sidebar.scss";
</style>
