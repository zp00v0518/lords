<template>
  <div class="castle_item_wrap">
    <div class="castle_interface">
      <div class="castle_icon"></div>
      <div class="castle_other">
        <div class="castle_name">{{name}}</div>
        <div class="resource_wrap">
          <div class="resource_item_wrap">
            <ResourceItem
              v-for="(item, index) in storage.sources"
              :key="index"
              :resource="item"
              :name="index"
            />
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
        <ArmyLine />
      </div>
    </div>

    <div class="hero_in_castle_wrap"></div>
  </div>
</template>

<script>
import modules from "./module";
import ArmyLine from "../ArmyLine";

export default {
  name: "Town",
  components: { ...modules, ArmyLine },
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

<style lang='scss'>
@import "town.scss";
</style>
