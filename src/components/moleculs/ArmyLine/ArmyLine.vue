<template>
  <div class="army-line">
    <div v-for="index in 7" :key="index" class="army-line__item">
      <div
        class="army-line__item--icon"
        :style="getIconUnit(army[index - 1])"
      ></div>
      <div class="army-line__item--count">
        {{ getCountUnits(army[index - 1]) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArmyLine",
  props: {
    army: { type: Array, default: () => [] }
  },
  methods: {
    getIconUnit(unit) {
      if (!unit) return {};
      const Army = this.globalConfig.all.Army;
      const pathImg = Army.getIconUnit({ unit });
      const styles = {
        backgroundImage: `url(${pathImg})`
      };
      return styles;
    },
    getCountUnits(unit) {
      if (!unit) return "";
      return unit.count;
    }
  }
};
</script>

<style lang="scss">
.army-line {
  display: flex;
  justify-content: space-between;
  padding-left: 3px;
  &__item {
    width: calc(100% / 7);
    height: 100%;
    margin-right: 3px;
    &:last-child {
      margin-right: 0px;
    }
    &--icon {
      width: 18px;
      height: 18px;
      border: 1px solid;
      margin-bottom: 2px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    &--count {
      font-size: 10px;
      @include center;
    }
  }
}
</style>
