<template>
  <section class="storage"></section>
</template>

<script>
export default {
  name: "Stroage",
  props: {
    townRaceName: String,
    currentTown: null,
    gloss: null
  },
  created() {},
  data() {
    return {};
  },
  computed: {
    storage() {
      return this.currentTown.town.storage;
    }
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
</style>
