<template>
  <section class="storage">

  </section>
</template>

<script>
export default {
  name: "Barraks",
  props: {
    townRaceName: String,
    currentTown: null,
    gloss: null,
    buildingData: null,
  },
  created () {
    console.log(this.buildingData)
  },
  data() {
    return {};
  },
  computed: {
    storage(){
      return this.currentTown.town.storage;
    }
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
</style>
