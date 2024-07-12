<template>
  <section id="scenes" class="scene">
    <span>
      <GlobalMap
        v-if="scenes.globalMap"
        :widthScene="widthScene"
        :heightScene="heightScene"
        key="globalMap"
      ></GlobalMap>
      <RegionMap
        v-if="scenes.region"
        :widthScene="widthScene"
        :heightScene="heightScene"
        key="regionMap"
      ></RegionMap>
      <TownMap
        v-if="scenes.town && readyToDraw"
        :widthScene="widthScene"
        :heightScene="heightScene"
        key="townMap"
      ></TownMap>
    </span>
    <div class="scene__buttons" @click="changeScene">
      <button
        type="button"
        class="scene__buttons__item"
        :class="{ 'scene__buttons__item--active': scenes.region }"
        data-flag="region"
      >
        Регион
      </button>
      <button
        type="button"
        class="scene__buttons__item"
        :class="{ 'scene__buttons__item--active': scenes.town }"
        data-flag="town"
      >
        Город
      </button>
      <button
        type="button"
        class="scene__buttons__item"
        :class="{ 'scene__buttons__item--active': scenes.globalMap }"
        data-flag="globalMap"
      >
        Карта
      </button>
    </div>
    <DialogWindow></DialogWindow>
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Scene',
  components: {
    DialogWindow: defineAsyncComponent(() => import('../../moleculs/DialogWindow')),
    GlobalMap: defineAsyncComponent(() => import('../../moleculs/Scenes/GlobalMap/GlobalMap.vue')),
    RegionMap: defineAsyncComponent(() => import('../../moleculs/Scenes/RegionMap/RegionMap.vue')),
    TownMap: defineAsyncComponent(() => import('../../moleculs/Scenes/TownMap/TownMap.vue')),
  },
  data() {
    return {
      scenes: {
        globalMap: false,
        region: false,
        town: false,
      },
    };
  },
  created() {},
  computed: {
    widthScene() {
      const styles = this.$el.getBoundingClientRect();
      console.log(styles);
      return styles.width + 'px';
    },
    heightScene() {
      const styles = this.$el.getBoundingClientRect();
      return styles.height + 'px';
    },
    readyToDraw() {
      return this.$store.state.userSectors.currentSector !== null;
    },
  },
  methods: {
    changeScene(event) {
      const target = event.target;
      const flag = target.dataset.flag;
      Object.keys(this.scenes).forEach((key) => {
        this.scenes[key] = key === flag;
      });
    },
  },
  mounted() {
    // this.scenes.region = true;
    this.scenes.globalMap = true;
    // this.scenes.town = true;
  },
};
</script>

<style lang="scss">
$widthScene: 500px;
.scene {
  flex-grow: 5;
  position: relative;
  &__canvas {
    border-bottom: 1px solid;
  }
  &__buttons {
    position: absolute;
    bottom: 0;
    margin-bottom: 15px;
    left: 50%;
    transform: translateX(-50%);

    &__item {
      cursor: pointer;
      padding: 8px;
      border: none;
      border-radius: 3px;
      &--active {
        font-weight: 700;
        background-color: transparent;
        outline: none;
      }
      @media (max-width: $tablet-small) {
        padding: 5px;
        font-size: 10px;
      }
    }
  }
}
</style>
