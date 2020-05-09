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
    <chat ref="chat" :isFullpage="isFullpage"></chat>
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
      },
      isFullpage: false,
      mainSize: {
        width: '',
        height: ''
      }
    };
  },
  created() {
    this.setMainSize();
    window.addEventListener('resize', this.setMainSize);
  },
  computed: {
    // mainSize() {
    //   const { ratio, getPersent } = this;
    //   const screenWidth = document.documentElement.clientWidth;
    //   const screenHeight = document.documentElement.clientHeight;
    //   let width = (screenWidth / 100) * getPersent(screenWidth);
    //   let height = width * ratio;
    //   height = height > screenHeight ? screenHeight : height;
    //   width = height / ratio;
    //   const mainSize = {
    //     width: width + 'px',
    //     height: height + 'px'
    //   };
    //   return mainSize;
    // },
    timeLineWidth() {
      return this.timeLineSize.width;
    },
    timeLineHeight() {
      return this.timeLineSize.height;
    },
    isChat() {
      return this.$store.state.chat.is;
    }
  },
  watch: {
    isChat: {
      handler(ev) {
        this.setRightMargin();
      }
    }
  },
  methods: {
    getPersent(width) {
      if (width < 800) return 98;
      if (width < 1024) return 90;
      if (width < 1280) return 85;
      return 75;
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
      const { $refs, isChat, $el, checkFullPage } = this;
      checkFullPage();
      const chat = $refs.chat.$el;
      const { isFullpage } = this;
      if (isChat && !isFullpage) {
        const styles = chat.getBoundingClientRect();
        const baseMargin = parseFloat(getComputedStyle($el).marginRight);
        $el.style.marginRight = baseMargin + styles.width / 2 + 'px';
      } else if (isChat && isFullpage) {
        $el.style.marginRight = this.getMiddleMargin();
      } else {
        $el.style.marginRight = this.getMiddleMargin();
      }
    },
    getMiddleMargin() {
      const { $el } = this;
      const style = $el.getBoundingClientRect();
      const screenWidth = document.documentElement.clientWidth;
      return (screenWidth - style.width) / 2 + 'px';
    },
    checkFullPage() {
      const { $el, $refs } = this;
      if (!$el || !$refs.chat.$el) return false;
      const screenWidth = document.documentElement.clientWidth;
      const mainStyle = $el.getBoundingClientRect();
      const chatStyle = $refs.chat.$el.getBoundingClientRect();
      this.isFullpage = mainStyle.width + chatStyle.width >= screenWidth;
      return this.isFullpage;
    },
    setMainSize() {
      const { ratio, getPersent } = this;
      const screenWidth = document.documentElement.clientWidth;
      const screenHeight = document.documentElement.clientHeight;
      let width = (screenWidth / 100) * getPersent(screenWidth);
      let height = width * ratio;
      height = height > screenHeight ? screenHeight : height;
      width = height / ratio;
      this.mainSize.width = width + 'px';
      this.mainSize.height = height + 'px';
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $main-bg;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  // margin-right: auto;
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
