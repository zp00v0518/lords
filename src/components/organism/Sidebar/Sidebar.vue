<template>
  <section class="sidebar">
    <Town v-for="(sector, index) in sectors" :indexTown="index" :key="index" :sector="sector">{{forUpdate(sector)}}</Town>
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
    return {};
  },
  computed: {
    sectors() {
      return this.$store.state.userSectors.sectors;
    }
  },
  methods: {
    forUpdate() {}
  }
};
</script>

<style lang='scss' scoped>
@import "sidebar.scss";
</style>
