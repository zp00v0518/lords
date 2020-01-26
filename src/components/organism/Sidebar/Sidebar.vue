<template>
  <section class="sidebar">
    <Town
      v-for="(sector, index) in sectorsState"
      :indexTown="index"
      :key="index"
      :sector="sector"
      ></Town
    >
  </section>
</template>

<script>
import Town from "../../moleculs/Town";

export default {
  name: "Sidebar",
  components: {
    Town
  },
  computed: {
    sectorsState() {
      return this.$store.state.userSectors.sectors;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "sidebar.scss";
</style>
