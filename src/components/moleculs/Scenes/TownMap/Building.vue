<template>
  <section class="building">
    <component  :is="name"></component>
  </section>
</template>

<script>
import Buildings from "./Buildings";

export default {
  name: "Building",
  props: {
    name: String,
  },
  components: {
    ...Buildings
  },
  data() {
    return {

    };
  },

  methods: {

  },
};
</script>

<style lang='scss' scoped>
</style>
