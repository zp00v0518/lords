<template>
  <div class="tooltip" :style="position">
    <template v-if="tile.type !== 2">
      <div class="tooltip__army" v-if="tile.type === 0 && mode === 'global'">
        <div class="tooltip__army--header">{{ gloss.region.header.txt }}</div>
        <div class="tooltip__army--wrap">
          <div v-for="(unit, index) in tile.army" :key="index" class="tooltip__army__item">
            <div class="tooltip__army__item--icon" :style="getIconUnit(unit)"></div>
            <div class="tooltip__army__item--count">{{ unit.count }}</div>
          </div>
        </div>
        <div class="tooltip__army--force">{{ gloss.region.army_force.txt }}:{{ getArmyForce() }}</div>
      </div>
      <div class="tooltip__header" v-if="tile.type === 1">Замок</div>
    </template>

    <template v-if="tile.type === 2">
      <div class="tooltip__header">{{ this.gloss[this.nameSector].type[this.type].name.txt }}</div>
      <div class="tooltip__town">{{ this.gloss.general.lvl.txt }}:{{ this.tile.sector.lvl }}</div>
    </template>

    <template v-if="tile.type === 3">
      <div class="tooltip__header">Empty sector</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TooltipRegion',
  props: {
    mouseCoords: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      }
    },
    tile: { type: Object },
    mode: { type: String }
  },
  data() {
    return {
      position: {},
      lang: this.$store.state.local.lang,
      mine: this.tile.mine,
      nameSector: ''
    };
  },
  computed: {
    type() {
      if (!this.tile.sector.type) return;
      return this.tile.sector.type;
    },
    gloss() {
      return this.$store.state.local.dictionary;
    }
  },
  watch: {
    tile: function() {
      this.nameSector = this.$region.typeList[this.tile.type];
      // const size = this.$el ? this.$el.getBoundingClientRect() : { height: 0 };
      const left = this.mouseCoords.x + 'px';
      const top = this.mouseCoords.y - 200 + 'px';
      // const top = this.mouseCoords.y - size.height - 70 + "px";
      this.position = { left, top };
    }
  },
  methods: {
    getIconUnit(unit) {
      if (!unit) return {};
      const Army = this.globalConfig.all.Army;
      const pathImg = Army.getIconUnit({ unit, iconType: 'ava', ext: '.jpg' });
      const styles = {
        backgroundImage: `url(${pathImg})`
      };
      return styles;
    },
    getArmyForce() {
      const { globalConfig } = this;
      const { army } = this.tile;
      const result = army.reduce((acc, unit) => {
        const { count, race, name } = unit;
        const unitInfo = globalConfig.races[race].units[name];
        return (acc += unitInfo.hp * count);
      }, 0);
      return result;
    }
  },
  updated() {
    // console.log(this.tile);
  }
};
</script>

<style lang="scss" scoped>
@import 'tooltipRegion.scss';
</style>
