<template>
  <div class="sector__events" :style="styles">
    <div
      v-for="(eventData, index) in data.listEvents"
      :key="index"
      class="event"
      @mouseenter="handlerMouseEnter($event, eventData)"
      @mouseleave="handlerMouseEnter($event, null)"
    ></div>
    <EventTooltip v-if="showTooltip" :dataEvent="dataEvent" :position='position'></EventTooltip>
  </div>
</template>

<script>
import EventTooltip from "./EventTooltip";
export default {
  name: "ViewSectorEvents",
  components: { EventTooltip },
  props: {
    data: Object,
    styles: null,
  },
  data() {
    return {
      showTooltip: false,
      dataEvent: {},
      position: 0,
      topEl: null,
    };
  },
  methods: {
    handlerMouseEnter($event, data) {
      if (!data) {
        this.showTooltip = false;
        this.dataEvent = {};
        return;
      }
      const target = $event.target;
      const style = target.getBoundingClientRect();
      this.position = style.top - this.topEl;
      this.showTooltip = true;
      this.dataEvent = data;
    }
  },
  mounted () {
    this.topEl = this.$el.getBoundingClientRect().top;
  }
};
</script>

<style lang='scss' scoped>
.sector__events {
  width: 15px;
  position: absolute;
  top: 100%;
}
.event {
  position: relative;
  width: 100%;
  border: 1px solid;
  height: 15px;
  cursor: pointer;
}
</style>
