<template>
  <div>ChoicesRace</div>
</template>

<script>
export default {
  name: "ChoicesRace",
  created() {
    const races = this.globalConfig.races;
    console.log(races.getRacesForChoice());
  }
};
</script>

<style lang="scss">
</style>
