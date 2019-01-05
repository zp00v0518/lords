<template>
    <section class="sidebar">
      <Town v-for='(town, index) in towns' :key="index" :town="town"></Town>
    </section>
</template>

<script>
import Town from '../../moleculs/Town';

export default {
  name: "Sidebar",
  components: {
    Town,
  },
  data() {
    return {
      towns: [],
    };
  },
  computed: {},
  watch: {
    '$store.state.towns.towns': function() {
      this.towns = this.$store.state.towns.towns;
    },
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
@import "sidebar.scss";
</style>
