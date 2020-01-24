<template>
  <section class="sidebar">
    <Town
      v-for="(sector, index) in sectors"
      :indexTown="index"
      :key="index"
      :sector="sector"
      >{{ forUpdate(sector) }}</Town
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
  data() {
    return {
      sectors: []
    };
  },
  computed: {
    sectorsState() {
      return this.$store.state.userSectors;
    }
  },
  watch: {
    "sectorsState.sectors": {
      deep: true,
      immediate: true,
      handler(e) {
        this.sectors = e;
      }
    }
  },
  methods: {
    forUpdate() {}
  }
};
</script>

<style lang="scss" scoped>
@import "sidebar.scss";
</style>
