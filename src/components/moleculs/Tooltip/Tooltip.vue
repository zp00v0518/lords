<template>
  <div class="tooltip" :style="position">
    <template v-if="tile.type === tileTypes.town.id">
      <div class="tooltip__header">
        <div class="tooltip__player">Player: {{tile.nickName}}</div>
        <div class="tooltip__town">Town: {{tile.town.name}}</div>
      </div>
    </template>
    <div class="tooltip__header" v-if="tile.type === tileTypes.empty.id">Лес</div>
    <div class="tooltip__header" v-if="tile.type === tileTypes.nishtyak.id">Игровой объект</div>
    <div class="tooltip__coords">
      <div class="tooltip__coords-x">X:{{tile.x}}</div>
      <div class="tooltip__coords-y">Y:{{tile.y}}</div>
    </div>
    <div class="globlamap-tooltip__icons">
      <img :src="getIcon(name)" v-for="(name, index) in listSource" :key="index" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
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
      position: {},
      listSource: [],
      tileTypes: {}
    };
  },
  created() {
    this.tileTypes = this.globalConfig.all.WorldMap.types;
  },
  watch: {
    tile: function() {
      const size = this.$el ? this.$el.getBoundingClientRect() : { height: 0 };
      const left = this.mouseCoords.x + 'px';
      const top = this.mouseCoords.y - size.height - 50 + 'px';
      this.position = { left, top };
      this.getListSource();
    }
  },
  methods: {
    getListSource() {
      const result = [];
      const { region } = this.tile;
      if (!region) return;
      const { Region } = this.globalConfig.all;
      region.forEach(row => {
        row.forEach(item => {
          if (item.type === Region.types.mine.id) {
            result.push(item.sector.type);
          }
        });
      });
      this.listSource = result;
    },
    getIcon(name) {
      const icons = this.gameSources.resources.small;
      return icons[name] ? icons[name].src : '';
    }
  }
};
</script>

<style lang='scss'>
@import 'tooltip.scss';
.globlamap-tooltip {
  &__icons {
    display: flex;
    justify-content: space-around;
    & img {
      width: 20px;
      margin: 5px;
    }
  }
}
</style>
