<template>
  <div class="timeline" :style="{width: widthScene+'px', height:heightScene+'px'}">
    <canvas ref="scene" :width="widthScene" :height="heightScene"></canvas>
    <!-- <div
      class="event"
      v-for="(eventItem, index) in eventsList"
      :key="index"
      :style="{left: getPosition(eventItem)}"
    ></div> -->
    <ViewSectorEvents v-for="(sectorEvent, index) in sectorsEventsPosition" :key="index" :data="sectorEvent"></ViewSectorEvents>
  </div>
</template>

<script>
import ViewSectorEvents from "./ViewSectorEvents";
import {
  formBreakpoint,
  drawBreakpointTime,
  drawDefaultTime,
  getPositionEvent,
  drawEventPoint
} from "./utils";

export default {
  name: "TimeLine",
  components: { ViewSectorEvents },
  props: ["widthScene", "heightScene"],
  data() {
    return {
      ctx: {},
      breakpoint: [],
      timerId: "",
      timerId_2: "",
      timeEvent: "",
      eventsList: []
    };
  },
  created() {},
  watch: {
    "$store.state.timeline.eventsList": function() {
      this.eventsList = this.$store.state.timeline.eventsList;
    }
  },
  computed: {
    sectorsEventsPosition() {
      if (this.eventsList.length === 0) {
        return [];
      }
      const arr = this.eventsList;
      const now = new Date().getTime();
      const step = 15;
      const result = [];
      let previos = this.getPositionEvent(now, arr[0].end)
      let inter = {
        position: previos,
        listEvents: [arr[0]],
      }
      for (let i = 1; i < arr.length; i++) {
        const position = this.getPositionEvent(now, arr[i].end)
        const dif = position - previos;
        if (dif > step) {
          inter.listEvents = inter.listEvents.map(item => item);
          result.push(JSON.parse(JSON.stringify(inter)));
          inter.position = 0;
          inter.listEvents = [];
        }
        if (inter.listEvents.length === 0){
          inter.position = this.getPositionEvent(now, arr[i].end)
        }
        inter.listEvents.push(arr[i]);
        previos = position;
      }
      result.push(inter);
      return result;
    }
  },
  methods: {
    formBreakpoint,
    drawBreakpointTime,
    drawDefaultTime,
    getPositionEvent,
    drawEventPoint,
    drawLoop() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawBreakpointTime(this.ctx, this.breakpoint);
      this.drawDefaultTime(this.ctx, this.breakpoint);
      this.drawEventPoint(this.position);
    },
    getPosition(eventItem) {
      const now = new Date().getTime();
      const position = this.getPositionEvent(now, eventItem.end);
      return position + "px";
    }
  },
  mounted() {
    this.ctx = this.$refs.scene.getContext("2d");
    this.breakpoint = this.formBreakpoint(
      this.breakpoint,
      parseFloat(this.widthScene)
    );
    this.drawLoop();
    this.timerId = setInterval(() => {
      this.drawLoop();
    }, 1000 * 15);
    this.timerId_2 = setInterval(() => {
      this.$store.commit("UPDATE_EVENTS");
    }, 1000 * 15);
  },
  beforeDestroy() {
    clearInterval(this.timerId);
    clearInterval(this.timerId_2);
  }
};
</script>

<style lang='scss' scoped>
@import "timeline.scss";

.event {
  width: 15px;
  height: 15px;
  border: 1px solid;
  position: absolute;
  top: 100%;
  // transform: translateX(-50%);
}
</style>
