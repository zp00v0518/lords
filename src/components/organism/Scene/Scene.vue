<template>
  <section class="scene">
    <GlobalMap v-if="scenes.globalMap" :widthScene="widthScene" :heightScene="heightScene" key='globalMap'></GlobalMap>
    <RegionMap v-if="scenes.region" :widthScene="widthScene" :heightScene="heightScene" key='regionMap'></RegionMap>
    <div class="scene__buttons" @click="changeScene">
      <button type="button" class="scene__buttons__item" data-flag="region">Регион</button>
      <button type="button" class="scene__buttons__item" data-flag="town">Город</button>
      <button type="button" class="scene__buttons__item" data-flag="globalMap">Карта</button>
    </div>
    <DialogWindow></DialogWindow>
  </section>
</template>

<script>
import { GlobalMap, RegionMap, TimeLine } from "../../moleculs/Scenes";
import DialogWindow from "../../moleculs/DialogWindow";

export default {
  name: "Scene",
  components: {
    GlobalMap,
    RegionMap,
    DialogWindow,
    TimeLine
  },
  data() {
    return {
      scenes: {
        globalMap: false,
        region: false,
        town: false
      }
    };
  },
  created() {
  },
  computed: {
    widthScene() {
      const styles = this.$el.getBoundingClientRect();
      return styles.width + 'px';
    },
    heightScene() {
      const styles = this.$el.getBoundingClientRect();
      return styles.height + 'px';
    },
  },
  methods: {
    changeScene(event) {
      const target = event.target;
      const flag = target.dataset.flag;
      Object.keys(this.scenes).forEach(key => {
        this.scenes[key] = key === flag;
      });
    }
  },
  mounted() {
    this.scenes.region = true;
  }
};
</script>

<style lang='scss' scoped>
@import "scene.scss";
</style>
