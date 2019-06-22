<template>
  <div class="event__tooltip" :style="{top: position+'px'}">
    <div
      class="event__tooltip__item"
    >{{upperFirstSymbol(gloss.timeLine.upgrade.txt)}} : {{gloss[this.parentBuild].type[this.type].name.txt}}</div>
    <div
      class="event__tooltip__item"
    >{{upperFirstSymbol(gloss.timeLine.timeEnd.txt)}}:{{formDataToView(dataEvent.end)}}</div>
  </div>
</template>

<script>
import glossary from "@/components/mixins/glossary.vue";

export default {
  name: "EventTooltip",
  mixins: [glossary],
  components: {},
  props: ["dataEvent", "position"],
  data() {
    return {
      eventData: null
    };
  },
  created(){
    console.log(this.dataEvent)
  },
  computed: {
    parentBuild(){
      return this.dataEvent.data.parent;
    },
    type() {
      return this.dataEvent.data.type;
    }
  },
  methods: {
    upperFirstSymbol(str) {
      const d = str.charAt(0);
      return d.toUpperCase() + str.substr(1);
    },
    formDataToView(date) {
      return new Date(date);
    }
  }
};
</script>

<style lang='scss' scoped>
.event__tooltip {
  position: absolute;
  border: 1px solid red;
  left: 200%;
  top: 0;
  z-index: 120;
  background-color: white;
  display: flex;
  flex-direction: column;
  word-wrap: normal;
  min-width: 120px;
  &__item {
    font-size: 11px;
    border: 1px solid blue;
    padding: 3px;
  }
}
</style>
