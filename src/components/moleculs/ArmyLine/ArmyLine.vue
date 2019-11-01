<template>
  <div class="army-line">
    <div v-for="(item, index) in army" :key="index" class="army-line__item">s</div>
  </div>
</template>

<script>
const army = [];
export default {
  name: "ArmyLine",
  props: {
    army: { type: Array, default: () => army }
  }
};
</script>
