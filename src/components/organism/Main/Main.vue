<template>
  <main class="main" :style="{width: mainSize.width, height: mainSize.height}">
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
        <div class="main__content__footer"></div>
      </div>
      <Sidebar></Sidebar>
    </div>
    <chat></chat>
  </main>
</template>

<script>
import Chat from '../Chat';
import Vheader from '../Header';
import Sidebar from '../Sidebar';
import Scene from '../Scene';
import TimeLine from '../../moleculs/Scenes/TimeLine/TimeLine.vue';

export default {
  name: 'Main',
  components: {
    Chat,
    Vheader,
    Sidebar,
    Scene,
    TimeLine
  },
  data() {
    return {
      widthTimeLine: '',
      heightTimeLine: ''
    };
  },
  computed: {
    mainSize() {
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      width = (width / 100) * 80;
      height = (height / 100) * 85;
      const mainSize = {
        width: width + 'px',
        height: height + 'px'
      };
      return mainSize;
    },
    widthScene() {
      return this.widthTimeLine;
    },
    heightScene() {
      return this.heightTimeLine;
    }
  },
  watch: {
    '$store.state.chat.is': function() {
      const isChat = this.$store.state.chat.is;
      if (isChat) {
        this.$el.style.marginRight = '14%';
      } else {
        this.$el.style.marginRight = '0';
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

<style lang='scss'>
.main {
  position: relative;
  width: 60%;
  height: 80%;
  min-height: 200px;
  min-width: 350px;
  margin-right: 14%;
  // @include border(black);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $main-bg;
  // background-image: url('../../../../frontEnd/img/main/background/panelcoloredbg.jpg');

  &__content {
    width: 100%;
    height: 85%;
    flex-grow: 5;
    display: flex;
    justify-content: space-between;
    &__footer {
      // border-top: 1px solid;
      height: 60px;
    }
  }
  &__scenes {
    // border: 1px solid blue;
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
  }
}
</style>
