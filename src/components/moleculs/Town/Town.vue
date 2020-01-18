<template>
  <div class="castle_item_wrap">
    <div class="castle_interface">
      <div class="castle_icon"></div>
      <div class="castle_other">
        <div class="castle_name">{{ name }}</div>
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
              <div class="storage_resource_sum">
                {{ maxValue.baseResource }}
              </div>
              <div class="storage_resource_max">max</div>
            </div>
            <div class="storage_item">
              <div class="storage_resource_sum">
                {{ maxValue.unicResource }}
              </div>
              <div class="storage_resource_max">max</div>
            </div>
          </div>
        </div>
        <div class="army_in_castle--wrap">
          <!-- <div class="army_in_castle--insert"></div> -->
          <ArmyLine :army="army" />
        </div>
      </div>
    </div>

    <div class="hero_in_castle_wrap">
      <HeroesInTown :heroesList="heroesList" />
    </div>
  </div>
</template>

<script>
import modules from "./module";
import ArmyLine from "../ArmyLine";
import HeroesInTown from "../HeroesInTown";

export default {
  name: "Town",
  components: { ...modules, ArmyLine, HeroesInTown },
  props: ["sector"],
  data() {
    return {
      name: "Default Name",
      townId: this.sector._id
    };
  },
  created() {
    this.name = this.sector.town.name;
  },
  computed: {
    army() {
      return this.sector.town.army.units;
    },
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
    },
    heroesList() {
      return this.$store.getters.getHeroesFromTown(this.townId);
    }
  }
};
</script>

<style lang="scss">
@import "town.scss";
.army_in_castle {
  &--wrap {
    display: flex;
  }
  &--insert {
    padding-left: 10px;
  }
}
</style>
