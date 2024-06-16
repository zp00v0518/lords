<template>
  <div class="event__tooltip" :style="{ top: position + 'px' }">
    <div class="event__tooltip__item">
      {{ upperFirstSymbol(gloss.timeLine.upgrade.txt) }} :
      {{ upperFirstSymbol(buildingName) }}
    </div>
    <div class="event__tooltip__item">
      {{ upperFirstSymbol(gloss.timeLine.timeEnd.txt) }}:{{
        formDataToView(dataEvent.end)
      }}
    </div>
  </div>
</template>

<script>
// import glossary from "../../../mixins/glossary";

export default {
  name: "EventTooltip",
  // mixins: [glossary],
  components: {},
  props: ["dataEvent", "position"],
  data() {
    return {
      eventData: null
    };
  },
  computed: {
    type() {
      return this.dataEvent.data.type;
    },
    allNames() {
      return this.gloss.town.race[this.eventRace];
    },
    eventRace() {
      const races = this.$store.state.globalConfig.races;
      return races.typeList[this.dataEvent.init.race];
    },
    typesEvent() {
      return this.globalConfig.all.Event.types;
    },
    buildingName() {
      const { typesEvent, dataEvent } = this;
      const eventType = dataEvent.type;
      if (eventType === "upgradeTown") {
        const lvl = dataEvent.data.nextLvl;
        return this.allNames[this.type].lvl[lvl].txt;
      } else if (eventType === "upgradeRegion") {
        const classBuild = dataEvent.data.class;
        return this.gloss[classBuild].type[this.type].name.txt;
      } else if (eventType === typesEvent.hiringUnits) {
        const { unitName } = dataEvent.data;
        const base = this.gloss.timeLine.hiring.txt;
        return `${base} ${unitName}`;
      }
    }
  },
  methods: {
    formDataToView(date) {
      return new Date(date);
    }
  }
};
</script>

<style lang="scss" scoped>
.event__tooltip {
  position: absolute;
  border: 1px solid $main-red;
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
