<template>
  <main class="main">
    <Vheader></Vheader>
    <div class="main__content">
      <div class="main__scenes" ref="scenes">
        <TimeLine :widthScene="widthScene" :heightScene="heightScene" kye="timeline"></TimeLine>
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
    this.heightTimeLine = height + "px";
    this.widthTimeLine = styles.width + "px";
  }
};
</script>

<style lang='scss' scoped>
@import "main.scss";
</style>
