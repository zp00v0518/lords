<template>
  <div class="castle_item_wrap">
    <div class="castle_interface">
      <div class="castle_icon"></div>
      <div class="castle_other">
        <div class="castle_name">{{name}}</div>
        <div class="resource_wrap">
          <div class="resource_item_wrap">
            <div class="resource_item gold">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(this.storage.sources.gold.nowValue)}}</div>
                <div class="resource_count">+{{this.storage.sources.gold.addValue}}</div>
              </div>
            </div>
            <div class="resource_item wood">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(this.storage.sources.wood.nowValue)}}</div>
                <div class="resource_count">+{{this.storage.sources.wood.addValue}}</div>
              </div>
            </div>
            <div class="resource_item ore">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(this.storage.sources.ore.nowValue)}}</div>
                <div class="resource_count">+{{this.storage.sources.ore.addValue}}</div>
              </div>
            </div>
            <div class="resource_item sulfur">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(this.storage.sources.sulfur.nowValue)}}</div>
                <div class="resource_count">+{{this.storage.sources.sulfur.addValue}}</div>
              </div>
            </div>
            <div class="resource_item crystal">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(this.storage.sources.crystal.nowValue)}}</div>
                <div class="resource_count">+{{this.storage.sources.crystal.addValue}}</div>
              </div>
            </div>
            <div class="resource_item mercury">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(this.storage.sources.mercury.nowValue)}}</div>
                <div class="resource_count">+{{this.storage.sources.mercury.addValue}}</div>
              </div>
            </div>
            <div class="resource_item gem">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(this.storage.sources.gem.nowValue)}}</div>
                <div class="resource_count">+{{this.storage.sources.gem.addValue}}</div>
              </div>
            </div>
          </div>
          <div class="storage_wrap">
            <div class="storage_item">
              <div class="storage_resource_sum">{{this.storage.maxValue.baseResource}}</div>
              <div class="storage_resource_max">max</div>
            </div>
            <div class="storage_item">
              <div class="storage_resource_sum">{{this.storage.maxValue.unicResource}}</div>
              <div class="storage_resource_max">max</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero_in_castle_wrap"></div>
  </div>
</template>

<script>
export default {
  name: "Town",
  props: ["sector", "indexTown"],
  data() {
    return {
      name: "Default Name",
      storage: {}
    };
  },
  created() {
    const type = this.$var.classInstance.storage;
    this.storage = this.sector.town[type];
    this.name = this.sector.town.name;
  },
  computed: {},
  methods: {},
  updated() {
    const type = this.$var.classInstance.storage;
    this.storage = this.sector.town[type];
    this.name = this.sector.town.name;
  }
};
</script>

<style lang='scss' scoped>
@import "town.scss";
</style>
