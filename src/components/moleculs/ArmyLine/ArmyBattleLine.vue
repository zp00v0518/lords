<template>
  <div class="battle-army-line" drag-container @mouseup="is_drag ? handlerMouseUp : {}">
    <div
      v-for="(item, index) in curArmy"
      class="battle-army-line__item"
      :class="`battle-army-line__item--${position}`"
      :key="index"
      drag-item
    >
      <template v-if="item">
        <div class="battle-army-line__item__stack">
          <div class="battle-army-line__item__stack--count">{{item.count}}</div>
          <div class="battle-army-line__item__stack--power">{{getForceStack(item)}}</div>
        </div>
        <div
          class="battle-army-line__item--avatar"
          @dragstart.prevent
          @mousedown="is_drag ? handlerMouseDown($event, {itemIndex: index -1, allValue: curArmy}, handlerDragStart) : {}"
        >
          <img :src="getUnitAvatar(item)" alt />
        </div>
        <div class="battle-army-line__item--type"></div>
      </template>
      <div v-else class="battle-army-line__item--gag"></div>
    </div>
  </div>
</template>

<script>
import dragMixin from "./dragMixin";
import { deepClone } from "../../../utils";

export default {
  name: "ArmyBattleLine",
  mixins: [dragMixin],
  props: {
    army: { type: Array, default: () => [] },
    position: { type: String, default: "left" },
    is_drag: { type: Boolean, default: false }
  },
  computed: {
    activeHero() {
      const { activeHeroId, heroesList } = this.$store.state.heroes;
      return heroesList.find(i => i._id === activeHeroId);
    }
  },
  data() {
    return {
      curArmy: deepClone(this.army)
    };
  },
  watch: {
    activeHero: {
      handler(e) {
        if (this.is_drag) {
          this.curArmy = deepClone(e.army);
        }
      }
    }
  },
  methods: {
    getUnitAvatar(unit) {
      const { Army } = this.globalConfig.all;
      return Army.getIconUnit({ unit });
    },
    getForceStack(stack) {
      const { Army } = this.globalConfig.all;
      return Army.getForceStack(stack);
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
    max-height: calc(100% / 8);
    justify-content: flex-end;
    margin: $baseMargin 0;
    &--right {
      flex-direction: row-reverse;
    }
    &__stack {
      margin: 0 $baseMargin * 2;
      font-size: 12px;
      line-height: 1.4em;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      &--count {
        font-weight: bold;
        margin-right: 10px;
      }
    }
    &--avatar{
      margin-right: 10px;
      img{
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
}
</style>
