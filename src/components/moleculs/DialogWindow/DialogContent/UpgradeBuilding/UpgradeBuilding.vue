<template>
  <section>
    <div class="info_wrap">
      <div class="icon" :style="info.style"></div>
      <div class="info">
        <p class="string" v-for="(item ,index) in info.text" :key="index">{{item}}</p>
        <div class="question">{{upgrade.question}}</div>
        <div class="upgrade_info_wrap">
          <div class="text">{{upgrade.text}}</div>
          <div class="price_wrap">
            <div class="resource_wrap">
              <div class="resource_item" v-for="(item, index) in upgrade.source" :key="index">
                <div class="icon" :style="item.style"></div>
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
    console.log(this);
  },
  data() {
   		return {
			info:{
				style:{
					backgroundImage: "url()",
				},
				text:["Lorem ipsum dolor sit amet."],
		},
			upgrade:{
				question:"???",
				text:"Description.dialog.valueUpgrade[lang]",
				source:[
					{
						style:{
							backgroundImage: "url()",
						},
						value: "3333"
					},
				],
			},
			time:{
				text:"wefsd",
				result:"s123455",
			}
		}
  }
};
</script>

<style lang='scss' scoped>
@import "upgrade_building.scss";
</style>
