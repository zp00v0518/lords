<template>
  <div class="battle-army-line">
    <div
      v-for="index in 7"
      class="battle-army-line__item"
      :class="`battle-army-line__item--${position}`"
      :key="index"
    >
      <template v-if="army[index-1]">
        <div class="battle-army-line__item__stack">
          <div class="battle-army-line__item__stack--count">{{army[index-1].count}}</div>
          <div class="battle-army-line__item__stack--power">{{army[index-1].force}}</div>
        </div>
        <div class="battle-army-line__item--avatar">
          <img :src="getUnitAvatar(army[index-1])" alt />
        </div>
        <div class="battle-army-line__item--type"></div>
      </template>
      <div v-else class="battle-army-line__item--gag"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArmyBattleLine",
  props: {
    army: { type: Array, default: () => [] },
    position: { type: String, default: "left" }
  },
  created() {
    console.log(this.army);
  },
  methods: {
    getUnitAvatar(unit) {
      const { Army } = this.globalConfig.all;
      return Army.getIconUnit({ unit });
    }
  }
};
</script>

<style lang="scss">
$baseMargin: 3px;
.battle-army-line {
  display: flex;
  flex-direction: column;
  &__item {
    display: flex;
    min-height: 36px;
    justify-content: flex-end;
    margin: $baseMargin 0;
    &--right {
      flex-direction: row-reverse;
    }
    &__stack {
      margin: 0 $baseMargin * 2;
			font-size: 12px;
			line-height: 1.4em;
			&--count{
				font-weight: bold;
			}
    }
  }
}
</style>
