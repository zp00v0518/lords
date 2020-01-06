<template>
  <div class="army-line">
    <div v-for="index in 7" :key="index" class="army-line__item">
      <div class="army-line__item--icon"></div>
      <div class="army-line__item--count"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArmyLine",
  props: {
    army: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss">
.army-line {
  display: flex;
  justify-content: space-between;
  &__item {
    width: calc(100% / 7);
    height: 100%;
    margin-right: 3px;
    &:last-child{
      margin-right: 0px;
    }
    &--icon {
      width: 18px;
      height: 18px;
      border: 1px solid;
      margin-bottom: 2px;
    }
    &--count {
      font-size: 10px;
      @include center;
    }
  }
}
</style>
