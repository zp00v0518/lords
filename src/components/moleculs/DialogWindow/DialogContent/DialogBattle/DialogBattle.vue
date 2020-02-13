<template>
  <div class="dialog-battle">
    <div class="dialog-battle__header">
      <div class="dialog-battle__header__item dialog-battle__header__item--attack">
        <div class="dialog-battle__header__item__info">
          <div
            class="dialog-battle__header__item__info--name"
          >{{ activeHero ? activeHero.name : "" }}</div>
        </div>
        <div class="dialog-battle__header__item__ava">
          <img :src="getHeroesAvatar(activeHero)" alt />
        </div>
      </div>

      <div class="dialog-battle__header__item dialog-battle__header__item--defense">
        <div>
          <div class="dialog-battle__header__item__info">
            <div
              class="dialog-battle__header__item__info--name"
            >{{ target === "monster" && defArmy[0] ? defArmy[0].name : "" }}</div>
          </div>
        </div>
        <div class="dialog-battle__header__item__ava">
          <img :src="getDefenderAvatar()" alt />
        </div>
      </div>
    </div>

    <div class="dialog-battle__content">
      <ArmyBattleLine
        :army="atackArmy"
        class="dialog-battle__content__item"
        @drag-finish="dragResult = $event.result"
        is_drag
      />
      <ArmyBattleLine :army="defArmy" position="right" class="dialog-battle__content__item" />
    </div>

    <div class="dialog-battle__confirm">
      <GuiBtn type="ok" class="dialog-battle__confirm--btn" @click="goBattle" />
      <GuiBtn type="cancel" class="dialog-battle__confirm--btn" @click="$emit('close')" />
    </div>
  </div>
</template>

<script>
import { deepClone } from "../../../../../utils";
import { ArmyBattleLine } from "../../../ArmyLine";
import { currentSector } from "../../../../mixins";

export default {
  name: "DialogBattle",
  mixins: [currentSector],
  components: { ArmyBattleLine },
  props: {
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      defArmy: [],
      target: this.data.target,
      atackArmy: [],
      dragResult: null
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
      }
    }
  },
  methods: {
    goBattle() {
      const result = this.dragResult
        ? this.dragResult
        : deepClone(this.atackArmy);
      const { $store, currentSector, activeHero, target } = this;

      if (!result || result.length === 0 || activeHero.army.length === 0) {
        this.$emit("close");
        return;
      }
      const sectorIndex = $store.state.userSectors.sectors.findIndex(
        i => i._id === currentSector._id
      );
      console.log(result);
      const message = {
        type: "battle",
        data: {
          sectorIndex,
          attackHeroId: activeHero._id,
          target,
          coords: {}
        }
      };
      // this.$ws.sendMessage(message);
      console.log(message);
      this.$emit("close");
    },
    sortDefenseArmy(army) {
      const { Army } = this.globalConfig.all;
      const arr = deepClone(army);
      if (arr.length < 2) return arr;
      arr.sort((a, b) => {
        return Army.getForceStack(b) - Army.getForceStack(a);
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
      min-width: 50%;
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
  &__content {
    display: flex;
    &__item {
      flex-basis: 50%;
      margin: 0 10px;
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
