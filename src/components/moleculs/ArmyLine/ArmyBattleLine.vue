<template>
  <div class="battle-army-line" drag-container @mouseup="handlerMouseUp">
    <div
      v-for="index in 7"
      class="battle-army-line__item"
      :class="`battle-army-line__item--${position}`"
      :key="index"
      drag-item
    >
      <template v-if="curArmy[index-1]">
        <div class="battle-army-line__item__stack">
          <div class="battle-army-line__item__stack--count">{{curArmy[index-1].count}}</div>
          <div class="battle-army-line__item__stack--power">{{curArmy[index-1].force}}</div>
        </div>
        <div
          class="battle-army-line__item--avatar"
          @dragstart.prevent
          @mousedown="handlerMouseDown($event, {itemIndex: index -1, allValue: curArmy}, handlerDragStart)"
        >
          <img :src="getUnitAvatar(curArmy[index-1])" alt />
        </div>
        <div class="battle-army-line__item--type"></div>
      </template>
      <div v-else class="battle-army-line__item--gag"></div>
    </div>
  </div>
</template>

<script>
import dragMixin from "./dragMixin";

export default {
  name: "ArmyBattleLine",
  mixins: [dragMixin],
  props: {
    army: { type: Array, default: () => [] },
    position: { type: String, default: "left" }
  },
  computed: {
    curArmy() {
      console.log(123)
      return JSON.parse(JSON.stringify(this.army));
    }
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
      &--count {
        font-weight: bold;
      }
    }
  }
}
</style>
