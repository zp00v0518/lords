<template>
  <div class="sector__events" :style="{left: data.position + 'px'}">
    <div
      v-for="(eventData, index) in data.listEvents"
      :key="index"
      class="event"
      @mouseenter="handlerMouseEnter(eventData)"
      @mouseleave="handlerMouseEnter(null)"
    ></div>
    <EventTooltip v-if="showTooltip" :dataEvent="dataEvent"></EventTooltip>
  </div>
</template>

<script>
import EventTooltip from "./EventTooltip";
export default {
  name: "ViewSectorEvents",
  components: { EventTooltip },
  props: {
    data: Object
  },
  data() {
    return {
      showTooltip: false,
      dataEvent: {}
    };
  },
  methods: {
    handlerMouseEnter(eventData) {
      if (!eventData) {
        this.showTooltip = false;
        this.dataEvent = {};
        return;
      }
      this.showTooltip = true;
      this.dataEvent = eventData;
    }
  }
};
</script>

<style lang='scss' scoped>
.sector__events {
  width: 15px;
  position: absolute;
  top: 100%;
  z-index: 10;
}
.event {
  position: relative;
  width: 100%;
  border: 1px solid;
  height: 15px;
  cursor: pointer;
}
</style>
