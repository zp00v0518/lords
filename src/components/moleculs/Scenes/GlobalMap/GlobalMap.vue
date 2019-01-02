<template>
 <div>
   <canvas ref='scene' :style="{width: widthScene, height: heightScene}"> </canvas>
 </div>
</template>

<script>
import {drawMap} from '../modules';
export default {
  name: "GlobalMap",
  props: ['widthScene', 'heightScene'],
  data() {
    return {
      ctx: null,
      currentMap:[],
    };
  },
  created() {
  },
  watch: {
    "$store.state.globalMap.currentMap": function() {
      this.currentMap = this.$store.state.globalMap.currentMap;
    this.drawMap()

    },
  },
  computed: {},
  methods: {
     drawMap,
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext('2d');
    // this.ctx.fillStyle= 'red';
    // this.ctx.fillRect(0,0, 100, 50);
  }
};
</script>

<style lang='scss' scoped>
@import "globalMap.scss";
</style>
