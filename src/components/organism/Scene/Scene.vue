<template>
  <section class="scene">
    <GlobalMap v-if="scenes.globalMap"></GlobalMap>
    <RegionMap v-if="scenes.region"></RegionMap>
    <div class="scene__buttons" @click="changeScene">
      <button type="button" class="scene__buttons__item" data-flag='region'>Регион</button>
      <button type="button" class="scene__buttons__item" data-flag='town'>Город</button>
      <button type="button" class="scene__buttons__item" data-flag='globalMap'>Карта</button>
    </div>
  </section>
</template>

<script>
import {GlobalMap, RegionMap} from '../../moleculs/Scenes'

export default {
  name: "Scene",
  components: {
    GlobalMap,
    RegionMap,
  },
  data() {
    return {
      scenes: {
        globalMap: true,
        region: false,
        town: false
      },
    };
  },
  created() {
    // console.log(this);
  },
  computed: {},
  methods: {
    changeScene(event) {
      const target = event.target;
      const flag = target.dataset.flag;
      Object.keys(this.scenes).forEach(key => {
        this.scenes[key] = key === flag;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "scene.scss";
</style>
