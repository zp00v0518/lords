<template>
  <div class="upgrade">
    <div class="upgrade__header">
      <div class="upgrade__header--txt">
        <img class="icon" :src="info.url">
      </div>
      <div class="upgrade__header--txt">
        <p v-for="(item ,index) in info.text" :key="index">{{item}}</p>
      </div>
    </div>
    <div class="question">{{gloss.dialog.questions.upgrade.txt}}</div>
    <div class="upgrade__info--wrap">
      <div class="upgrade__info--txt">{{gloss.dialog.valueUpgrade.txt}}</div>
      <div class="upgrade__info___price--wrap">
        <div class="upgrade__info__resource--wrap">
          <div
            class="upgrade__info__resource--item"
            v-for="(item, index) in upgrade.source"
            :key="index"
          >
            <img class="upgrade__info__resource--icon" :src="'img/resources/'+item.resource+'.gif'">
            <div class="upgrade__info__resource--sum">{{item.value}}</div>
          </div>
        </div>
        <div class="time_wrap">
          <div class="text">{{gloss.date.time.txt}}</div>
          <div class="value">{{upgrade.time}}</div>
        </div>
        <div class="range_price_wrap">
          <input type="range">
        </div>
        <div class="answer">
          <div class="answer_result yes" v-on:click="{}">Да</div>
          <div class="answer_result no" v-on:click="{}">Нет</div>
        </div>
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
    console.log(this.data);
  },
  watch: {
    "$store.state.local.dictionary": function() {
      this.gloss = this.$store.state.local.dictionary;
    }
  },
  data() {
    return {
      gloss: {},
      info: {
        url: "img/resources/" + this.data.type + ".gif",
        text: ["Lorem ipsum dolor sit amet.", "2Lorem ipsum dolor sit amet."]
      },
      upgrade: {
        time: this.getTimeString(this.$var.mine.getTimeUpgrade(this.data.lvl)),
        source: this.$var.mine.getResourcesForUpgrade(this.data.lvl)
      }
    };
  },
  methods: {
    getTimeString
  }
};
</script>

<style lang='scss' scoped>
@import "upgrade_building.scss";
</style>
