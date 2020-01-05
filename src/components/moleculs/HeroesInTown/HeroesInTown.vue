<template>
  <div class="heroes-in-town">
    <div
      v-for="(heroes, index) in heroesList"
      :key="index"
      class="heroes-in-town__item"
    >
      heroes in town
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroesInTown",
  props: {
    heroesList: { type: Array, default: () => [] }
  },
  created() {
    console.log(this.heroesList);
  }
};
</script>
