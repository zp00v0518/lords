<template>
  <div class="tooltip" :style="position">
    <template v-if="tile.type !== 2">
      <div class="tooltip__header" v-if="tile.type === 0">Лес</div>
      <div class="tooltip__header" v-if="tile.type === 1">Замок</div>
    </template>
    <template v-if="tile.type === 2"> 
       <div class="tooltip__header">{{this.$dictionary[this.nameSector].type[this.type].name[this.lang]}}</div>
        <div class="tooltip__town"> {{this.$dictionary.general.lvl[this.lang]}}:{{this.tile.sector.lvl}}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "TooltipRegion",
  props: {
    mouseCoords: {
      type: Object,
      default: { x: 0, y: 0 }
    },
    tile: {
      type: Object
    }
  },
  data() {
    return {
      position: {},
      lang: this.$store.state.local.lang,
      mine: this.tile.mine,
      nameSector: '',
    };
  },
  created () {
  },
  computed: {
    type() {
      if (!this.tile.sector.type) return;
      return this.tile.sector.type
    }
  },
  watch: {
    tile: function() {
      this.nameSector = this.$region.type[this.tile.type];
      const size = this.$el ? this.$el.getBoundingClientRect() : { height: 0 };
      const left = this.mouseCoords.x + "px";
      const top = this.mouseCoords.y - size.height - 70 + "px";
      this.position = { left, top };
    }
  }
}; 
</script>

<style lang='scss' scoped>
@import "tooltipRegion.scss";
</style>
