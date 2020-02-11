<template>
  <div class="dialog-battle">
    <div class="dialog-battle__header">
      <div
        class="dialog-battle__header__item dialog-battle__header__item--attack"
      >
        <div class="dialog-battle__header__item__info">
          <div class="dialog-battle__header__item__info--name">
            {{ activeHero ? activeHero.name : "" }}
          </div>
        </div>
        <div class="dialog-battle__header__item__ava">
          <img :src="getHeroesAvatar(activeHero)" alt="" />
        </div>
      </div>

      <div
        class="dialog-battle__header__item dialog-battle__header__item--defense"
      >
        <div>
          <div class="dialog-battle__header__item__info">
            <div class="dialog-battle__header__item__info--name">
              {{ target === "monster" && defArmy[0] ? defArmy[0].name : "" }}
            </div>
          </div>
        </div>
        <div class="dialog-battle__header__item__ava">
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
      defArmy: [],
      target: this.data.target,
      atackArmy: []
    };
  },
  created() {
    this.defArmy = this.sortDefenseArmy(this.data.defenseArmy || []);
  },
  computed: {
    activeHero() {
      const { activeHeroId, heroesList } = this.$store.state.heroes;
      return heroesList.find(i => i._id === activeHeroId);
    }
  },
  watch: {
    activeHero: {
      immediate: true,
      handler(e) {
        this.atackArmy = e && e.army ? deepClone(e.army) : [];
        this.setForceStack(this.atackArmy);
      }
    }
  },
  methods: {
    goBattle() {
      console.log("goBattle");
    },
    setForceStack(army) {
      const { Army } = this.globalConfig.all;
      army.forEach(a => {
        a.force = Army.getUnitInfo(a.race, a.name).hp * a.count;
      });
    },
    sortDefenseArmy(army) {
      const arr = deepClone(army);
      this.setForceStack(arr);
      if (arr.length < 2) return arr;
      arr.sort((a, b) => {
        return b.force - a.force;
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
    margin-bottom: 20px;
    margin-top: 5px;
    &__item {
      display: flex;
      margin: 0 10px;
      flex-basis: 50%;
      &__ava {
        width: 50px;
        height: 50px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      &__info {
        padding: 0 10px;
        &--name {
          text-transform: capitalize;
        }
      }
      &--attack {
        justify-content: flex-end;
      }
      &--defense {
        justify-content: flex-end;
        flex-direction: row-reverse;
      }
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
