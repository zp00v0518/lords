<template>
  <main
    class="main"
    :style="{width: mainSize.width, height: mainSize.height, maxWidth:mainSize.width, minWidth:mainSize.width }"
  >
    <Vheader></Vheader>
    <div class="main__content">
      <div class="main__scenes" ref="scenes">
        <TimeLine
          v-if="timeLineHeight"
          :widthScene="timeLineWidth"
          :heightScene="timeLineHeight"
          key="timeline"
        ></TimeLine>
        <Scene ref="scene"></Scene>
        <div class="main__content__footer"></div>
      </div>
      <Sidebar></Sidebar>
    </div>
    <chat ref="chat"></chat>
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
      heightTimeLine: '',
      ratio: 0.6,
      timeLineSize: {
        width: '',
        height: ''
      }
    };
  },
  computed: {
    mainSize() {
      const { ratio, getPersent } = this;
      const screenWidth = document.documentElement.clientWidth;
      const screenHeight = document.documentElement.clientHeight;
      let width = (screenWidth / 100) * getPersent(screenWidth);
      let height = width * ratio;
      height = height > screenHeight ? screenHeight : height;
      width = height / ratio;
      const mainSize = {
        width: width + 'px',
        height: height + 'px'
      };
      return mainSize;
    },
    timeLineWidth() {
      return this.timeLineSize.width;
    },
    timeLineHeight() {
      return this.timeLineSize.height;
    }
  },
  watch: {
    '$store.state.chat.is': function() {
      const isChat = this.$store.state.chat.is;
      if (isChat) {
        this.setRightMargin();
      } else {
        this.$el.style.marginRight = this.getMiddleMargin();
      }
    }
  },
  methods: {
    getPersent(width) {
      if (width < 800) return 100;
      if (width < 1280) return 90;
      return 80;
    },
    setTimelineSize() {
      const { $refs } = this;
      if (!$refs.scenes) return;
      const styles = $refs.scenes.getBoundingClientRect();
      let height = (styles.height / 100) * 10;
      height = height > 20 ? 20 : height;
      this.timeLineSize.height = height;
      this.timeLineSize.width = styles.width;
    },
    setRightMargin() {
      const { $refs } = this;
      const chat = $refs.chat.$el;
      const styles = chat.getBoundingClientRect();
      this.$el.style.marginRight = styles.width + 20 + 'px';
    },
    getMiddleMargin() {
      const { $el } = this;
      const style = $el.getBoundingClientRect();
      const screenWidth = document.documentElement.clientWidth;
      return (screenWidth - style.width) / 2 + 'px';
    }
  },
  mounted() {
    this.setTimelineSize();
    this.setRightMargin();
  }
};
</script>

<style lang='scss'>
.main {
  position: relative;
  min-height: 200px;
  min-width: 320px;
  // margin-right: 14%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $main-bg;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  align-self: center;
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
