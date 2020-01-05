<template>
  <div class="heroes-in-town">
    <div
      v-for="(heroes, index) in heroesList"
      :key="index"
      class="heroes-in-town__item"
    >
      <div>
        img
      </div>
      <div>control</div>
      <div>
        content
      </div>
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
<style lang="scss">
.heroes-in-town{
  border: 1px solid red;
  display: flex;
  width: 100%;
}

</style>
