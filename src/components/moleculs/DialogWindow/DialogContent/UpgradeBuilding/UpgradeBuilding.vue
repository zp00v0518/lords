<template>
  <section>
    <div class="info_wrap">
      <img class="icon" :src="info.url">
      <div class="info">
        <p class="string" v-for="(item ,index) in info.text" :key="index">{{item}}</p>
        <div class="question">{{gloss.dialog.questions.upgrade.txt}}</div>
        <div class="upgrade_info_wrap">
          <div class="text">{{gloss.dialog.valueUpgrade.txt}}</div>
          <div class="price_wrap">
            <div class="resource_wrap">
              <div class="resource_item" v-for="(item, index) in upgrade.source" :key="index">
                <img class="icon" :src="item.url">
                <div class="sum">{{item.value}}</div>
              </div>
            </div>
            <div class="time_wrap">
              <div class="text">{{time.text}}</div>
              <div class="value">{{time.result}}</div>
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
    </div>
  </section>
</template>

<script>
export default {
  name: "UpgradeBuilding",
  props: {
    data: Object
  },
  created() {
    this.gloss = this.$store.state.local.dictionary;
  },
  watch: {
    "$store.state.local.dictionary": function() {
      this.gloss = this.$store.state.local.dictionary;
    },
  },
  data() {
    return {
      gloss: {},
      info: {
        url: "img/resources/" + this.data.type + ".gif",
        text: ["Lorem ipsum dolor sit amet."]
      },
      upgrade: {
        source: [
          {
            url: 'img/resources/gold.gif',
            value: "3333"
          },
        ]
      },
      time: {
        text: "wefsd",
        result: "s123455"
      }
    };
  }
};
</script>

<style lang='scss' scoped>
@import "upgrade_building.scss";
</style>
