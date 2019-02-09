<template>
  <div class="upgrade">
    <div class="upgrade__header">
      <div class="upgrade__header--icon">
        <img class="icon" :src="info.url">
      </div>
      <div class="upgrade__header--txt">
        <p v-for="(item ,index) in info.text" :key="index">{{item}}</p>
      </div>
    </div>
    <h4 class="upgrade__question">{{gloss.dialog.questions.upgrade.txt}}</h4>
    <div class="upgrade__info--wrap">
      <div class="upgrade__info--txt">{{gloss.dialog.valueUpgrade.txt}}</div>
      <div class="upgrade__price--wrap">
        <div class="upgrade__price--item">
          <div
            class="upgrade__price__resource"
            v-for="(item, index) in upgrade.source"
            :key="index"
          >
            <div class="upgrade__price__resource--icon">
              <img :src="'img/resources/'+item.resource+'.gif'">
            </div>
            <div class="upgrade__info__resource--sum">{{item.value}}</div>
          </div>
        </div>
        <div class="upgrade__price--item">
          <div class="text">{{gloss.date.time.txt | upperFirstSymbol}}</div>
          <div class="value">{{upgrade.time}}</div>
        </div>
      </div>
      <div class="upgrade__range">
        <h5 class="upgrade__range--txt">Изменить стоимость и время улучшения</h5>
        <div class="upgrade__range--item">
          <input type="range" min="70" max="130" v-model="rangeValue" step="1">
        </div>
      </div>
      <div class="upgrade__answer">
        <div
          class="upgrade__answer__item yes"
          @click="upgratedBuilding"
        >{{gloss.dialog.answer.yes.txt}}</div>
        <div
          class="upgrade__answer__item no"
          @click="closeDialogWindow"
        >{{gloss.dialog.answer.no.txt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeString } from "../modules";
import glossary from "@/components/mixins/glossary.vue";
import fromBackend from "@/fromBackend";
const checkSource = fromBackend.checkSource;

export default {
  name: "UpgradeBuilding",
  mixins: [glossary],
  props: {
    data: Object
  },
    data() {
    return {
      building: null,
      rangeValue: 100,
      info: {
        url: "img/resources/" + this.data.building.type + ".gif",
        text: ["Lorem ipsum dolor sit amet.", "2 Lorem ipsum dolor sit amet."]
      }
    };
  },
  created() {
    this.building = this.data.building;
    this.$emit("set-height", { width: "90%", height: "90%" });
  },
  computed: {
    upgrade() {
      return {
        time: this.getTimeString(
          this.$var.mine.getTimeUpgrade(this.building.lvl, this.rangeValue)
        ),
        source: this.$var.mine.getResourcesForUpgrade(
          this.building.lvl,
          this.rangeValue
        )
      };
    },
    currentSector() {
      return this.$store.state.userSectors.currentSector;
    }
  },

  methods: {
    getTimeString,
    checkSource,
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    },
    upgratedBuilding() {
      if (this.building.upgrade.is){
         const dialog = {
          data: { txt: this.gloss.dialog.isUpgrade.txt },
          type: "message"
        };
        this.$store.dispatch("DIALOG_SHOW", dialog);
      }
      const storageName = this.$var.town.listBuilding[0];
      if (this.checkSource(this.upgrade.source, this.currentSector.town[storageName].sources)) {
        const message = {
          type: "upgradeRegion",
          data: {
            sectorIndex: this.$store.state.userSectors.sectors.indexOf(this.currentSector),
            persent: this.rangeValue,
            building: { 
              type: this.building.type,
                x: this.data.x,
                y: this.data.y,
              },
          }
        };
        this.$ws.sendMessage(message);
        this.$store.commit("DIALOG_CLOSE");
      } else {
        const dialog = {
          data: { txt: this.gloss.dialog.notResources.txt },
          type: "message"
        };
        this.$store.dispatch("DIALOG_SHOW", dialog);
      }
    },
    // checkSource(sourceArr, sources) {
    //   let flag = true;
    //   for (let i = 0; i < sourceArr.length; i++) {
    //     const type = sourceArr[i].resource;
    //     const value = +sourceArr[i].value;
    //     if (sources[type].nowValue < value) {
    //       flag = false;
    //       break;
    //     }
    //   }
    //   return flag;
    // }
  }
};
</script>

<style lang='scss' scoped>
@import "upgrade_region.scss";
</style>
