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
            >{{ target === "region" && defArmy[0] ? defArmy[0].name : "" }}</div>
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
import { deepClone } from '../../../../../utils';
import { ArmyBattleLine } from '../../../ArmyLine';
import { currentSector } from '../../../../mixins';

export default {
  name: 'DialogBattle',
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
      const result = this.dragResult ? this.dragResult : deepClone(this.atackArmy);
      const { $store, currentSector, activeHero, target } = this;

      if (!result || result.length === 0 || activeHero.army.length === 0) {
        this.$emit('close');
        return;
      }
      const sectorIndex = $store.state.userSectors.sectors.findIndex(i => i._id === currentSector._id);
      const message = {
        type: 'battleRequest',
        data: {
          sectorIndex,
          attackHeroId: activeHero._id,
          target,
          tileId: this.data.tile.id,
          army: result.map(i => {
            const { race, name, count } = i;
            return { race, name, count };
          })
        }
      };
      this.$ws.sendMessage(message);
      this.$emit('close');
      this.$store.commit('SET_ACTIVE_HERO_ID', -1);
    },
    sortDefenseArmy(army) {
      const { Army } = this.globalConfig.all;
      const arr = deepClone(army);
      if (arr.length < 2) return arr;
      Army.sortDefenseArmy(arr);
      return arr;
    },
    getHeroesAvatar(hero) {
      if (!hero) return;
      const { races } = this.globalConfig;
      return races.heroes.getHeroImg(hero.race, hero.type);
    },
    getDefenderAvatar() {
      const { Army } = this.globalConfig.all;
      if (this.data.target === 'region') {
        const { defArmy } = this;
        if (defArmy.length === 0) return '';
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
  height: 100%;
  &__header {
    display: flex;
    justify-content: center;
    max-height: 20%;
    margin-bottom: 20px;
    margin-top: 5px;
    @media (max-width: $tablet) {
      margin-bottom: 10px;
      max-height: 8%;
    }

    &__item {
      display: flex;
      margin: 0 10px;
      flex-basis: 50%;
      min-width: 50%;
      &__ava {
        max-width: 50px;
        max-height: 50px;
        & > img {
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
    flex-grow: 2;
    margin-bottom: 20px;
    max-height: 80%;
    &__item {
      flex-basis: 50%;
      margin: 0 10px;
    }
  }
  &__confirm {
    display: flex;
    justify-content: center;
    max-height: 40px;
    height: 20%;
    &--btn {
      margin: 0 10px;
    }
  }
}
</style>
