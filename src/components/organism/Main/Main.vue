<template>
  <main class="main" :style="{width: mainSize.width, height: mainSize.height}">
  <!-- <main class="main"> -->
    <Vheader></Vheader>
    <div class="main__content">
      <div class="main__scenes" ref="scenes">
        <TimeLine
          v-if="heightScene"
          :widthScene="widthScene"
          :heightScene="heightScene"
          key="timeline"
        ></TimeLine>
        <Scene></Scene>
      </div>
      <Sidebar></Sidebar>
    </div>
    <chat></chat>
  </main>
</template>

<script>
import Chat from "../Chat";
import Vheader from "../Header";
import Sidebar from "../Sidebar";
import Scene from "../Scene";
import TimeLine from "../../moleculs/Scenes/TimeLine/TimeLine.vue";

export default {
  name: "Main",
  components: {
    Chat,
    Vheader,
    Sidebar,
    Scene,
    TimeLine
  },
  data() {
    return {
      widthTimeLine: "",
      heightTimeLine: ""
    };
  },
  computed: {
    mainSize(){
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      width = width/100 * 70;
      height = height/100 * 90;
      const mainSize = {
        width: width + 'px',
        height: height + 'px',
      }
      return mainSize
    },
    widthScene() {
      return this.widthTimeLine;
    },
    heightScene() {
      return this.heightTimeLine;
    }
  },
  watch: {
    "$store.state.chat.is": function() {
      const isChat = this.$store.state.chat.is;
      if (isChat) {
        this.$el.style.marginRight = "14%";
      } else {
        this.$el.style.marginRight = "0";
      }
    }
  },
  mounted() {
    const styles = this.$refs.scenes.getBoundingClientRect();
    let height = (styles.height / 100) * 10;
    height = height > 20 ? 20 : height;
    this.heightTimeLine = height;
    this.widthTimeLine = styles.width;
  }
};
</script>

<style lang='scss' scoped>
@import "main.scss";
</style>
