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
                <div class="resource_sum">{{Math.floor(storage.sources.gold.nowValue)}}</div>
                <div class="resource_count">+{{storage.sources.gold.addValue}}</div>
              </div>
            </div>
            <div class="resource_item wood">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(storage.sources.wood.nowValue)}}</div>
                <div class="resource_count">+{{storage.sources.wood.addValue}}</div>
              </div>
            </div>
            <div class="resource_item ore">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(storage.sources.ore.nowValue)}}</div>
                <div class="resource_count">+{{storage.sources.ore.addValue}}</div>
              </div>
            </div>
            <div class="resource_item sulfur">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(storage.sources.sulfur.nowValue)}}</div>
                <div class="resource_count">+{{storage.sources.sulfur.addValue}}</div>
              </div>
            </div>
            <div class="resource_item crystal">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(storage.sources.crystal.nowValue)}}</div>
                <div class="resource_count">+{{storage.sources.crystal.addValue}}</div>
              </div>
            </div>
            <div class="resource_item mercury">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(storage.sources.mercury.nowValue)}}</div>
                <div class="resource_count">+{{storage.sources.mercury.addValue}}</div>
              </div>
            </div>
            <div class="resource_item gem">
              <div class="resource_icon"></div>
              <div class="resource_sum_wrap">
                <div class="resource_sum">{{Math.floor(storage.sources.gem.nowValue)}}</div>
                <div class="resource_count">+{{storage.sources.gem.addValue}}</div>
              </div>
            </div>
          </div>
          <div class="storage_wrap">
            <div class="storage_item">
              <div class="storage_resource_sum">{{maxValue.baseResource}}</div>
              <div class="storage_resource_max">max</div>
            </div>
            <div class="storage_item">
              <div class="storage_resource_sum">{{maxValue.unicResource}}</div>
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
      name: "Default Name"
    };
  },
  created() {
    this.name = this.sector.town.name;
  },
  computed: {
    races() {
      return this.globalConfig.races;
    },
    typeStorage() {
      return this.globalConfig.listBuildings.storage.name;
    },
    storage() {
      return this.sector.town[this.typeStorage];
    },
    maxValue() {
      const lvl = this.storage.lvl;
      const allBuildings = this.races[this.townRace].buildings;
      const infoAllStorage = allBuildings[this.typeStorage];
      return infoAllStorage.lvl[lvl].maxValue;
    },
    townRace() {
      const typeTown = this.sector.town.race;
      return this.races.typeList[typeTown];
    }
  }
};
</script>

<style lang='scss' scoped>
@import "town.scss";
</style>
