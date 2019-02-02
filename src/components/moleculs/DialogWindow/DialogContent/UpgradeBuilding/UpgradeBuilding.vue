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
export default {
  name: "UpgradeBuilding",
  props: {
    data: Object
  },
  created() {
    this.gloss = this.$store.state.local.dictionary;
  },
  computed: {
    upgrade() {
      return {
        time: this.getTimeString(
          this.$var.mine.getTimeUpgrade(this.data.lvl, this.rangeValue)
        ),
        source: this.$var.mine.getResourcesForUpgrade(
          this.data.lvl,
          this.rangeValue
        )
      };
    }
  },
  watch: {
    "$store.state.local.dictionary": function() {
      this.gloss = this.$store.state.local.dictionary;
    }
  },
  data() {
    return {
      gloss: {},
      rangeValue: 100,
      info: {
        url: "img/resources/" + this.data.type + ".gif",
        text: ["Lorem ipsum dolor sit amet.", "2Lorem ipsum dolor sit amet."]
      }
    };
  },
  methods: {
    getTimeString,
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    },
    upgratedBuilding() {
      console.log(this.rangeValue);
      console.log(this.data.lvl);
      console.log(this.upgrade.source);
    },
    checkSource(sourceArr) {}
  }
};
</script>

<style lang='scss' scoped>
@import "upgrade_building.scss";
</style>
