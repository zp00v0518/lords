<template>
  <div class="tooltip" :style="position">
    <template v-if="tile.type === 1">
      <div class="tooltip__header">
        <div class="tooltip__player">Player: {{tile.nickName}}</div>
        <div class="tooltip__town">Town: {{tile.town.name}}</div>
      </div>
    </template>
    <div class="tooltip__header" v-if="tile.type === 0">Лес</div>
    <div class="tooltip__header" v-if="tile.type === 2">Игровой объект</div>
    <div class="tooltip__coords">
      <div class="tooltip__coords-x">X:{{tile.x}}</div>
      <div class="tooltip__coords-y">Y:{{tile.y}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    mouseCoords: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      }
    },
    tile: { type: Object }
  },
  data() {
    return {
      position: {}
    };
  },
  watch: {
    tile: function() {
      const size = this.$el ? this.$el.getBoundingClientRect() : { height: 0 };
      const left = this.mouseCoords.x + "px";
      const top = this.mouseCoords.y - size.height - 50 + "px";
      this.position = { left, top };
    }
  }
};
</script>

<style lang='scss' scoped>
@import "tooltip.scss";
</style>
