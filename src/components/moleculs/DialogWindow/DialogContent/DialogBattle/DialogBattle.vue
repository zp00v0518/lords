<template>
  <div class="dialog-battle">
    <div class="dialog-battle__header">
      <div
        class="dialog-battle__header__item dialog-battle__header__item--attack"
      >
        <div>info</div>
        <div>
          <img :src="getHeroesAvatar(activeHero)" alt="" />
        </div>
      </div>

      <div
        class="dialog-battle__header__item dialog-battle__header__item--defense"
      >
        <div>info</div>
        <div>
          <img :src="getDefenderAvatar()" alt="" />
        </div>
      </div>
    </div>

    <div class="dialog-battle__confirm">
      <GuiBtn
        type="buy"
        class="dialog-battle__confirm--btn"
        @click="goBattle"
      />
      <GuiBtn
        type="cancel"
        class="dialog-battle__confirm--btn"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
import { deepClone } from "../../../../../utils";

export default {
  name: "DialogBattle",
  props: {
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      defArmy: []
    };
  },
  created() {
    this.defArmy = this.sortDefenseArmy(this.data.defenseArmy);
  },
  computed: {
    activeHero() {
      const { activeHeroId, heroesList } = this.$store.state.heroes;
      return heroesList.find(i => i._id === activeHeroId);
    }
  },
  methods: {
    goBattle() {
      console.log("goBattle");
    },
    sortDefenseArmy(army) {
      if (army.length < 2) return;
      const { Army } = this.globalConfig.all;
      const arr = deepClone(army);
      arr.sort((a, b) => {
        const unitA = Army.getUnitInfo(a.race, a.name);
        const unitB = Army.getUnitInfo(b.race, b.name);
        return unitB.hp * b.count - unitA.hp * a.count;
      });
      return arr;
    },
    getHeroesAvatar(hero) {
      if (!hero) return;
      const { races } = this.globalConfig;
      return races.heroes.getHeroImg(hero.race, hero.type);
    },
    getDefenderAvatar() {
      const { Army } = this.globalConfig.all;
      if (this.data.target === "monster") {
        const { defArmy } = this;
        if (defArmy.length === 0) return "";
        return Army.getIconUnit({ unit: defArmy[0] });
      }
    }
  }
};
</script>

<style lang="scss">
.dialog-battle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__header {
    display: flex;
    justify-content: center;
    &__item {
      display: flex;
    }
  }
  &__confirm {
    display: flex;
    justify-content: center;
    height: 40px;
    &--btn {
      margin: 0 10px;
    }
  }
}
</style>
