<template>
  <div class="heroes-in-town">
    <div
      v-for="(hero, index) in list"
      :key="index"
      class="heroes-in-town__item"
    >
      <div class="heroes-in-town__item--img">
        <img :src="getHeroesAvatar(hero)" alt="heroavatar" />
      </div>
      <div class="heroes-in-town__item__control">
        <GuiBtn
          type="up"
          class="heroes-in-town__item__control--item"
          @click="mergeArmy(index, 'out')"
          :disabled="hero.army.length === 0"
        />
        <GuiBtn
          type="down"
          class="heroes-in-town__item__control--item"
          @click="mergeArmy(index, 'in')"
          :disabled="disabled_in"
        />
      </div>
      <div class="heroes-in-town__item__content">
        <div class="heroes-in-town__item__content__info">
          <div class="heroes-in-town__item__content__info--name">
            {{ hero.name }}
          </div>
          <div class="heroes-in-town__item__content__info--lvl">
            lvl: {{ hero.lvl }}
          </div>
        </div>
        <ArmyLine
          class="heroes-in-town__item__content__army"
          :army="hero.army"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArmyLine from "../ArmyLine";

export default {
  name: "HeroesInTown",
  components: { ArmyLine },
  props: {
    heroesList: { type: Array, default: () => [] }
  },
  data() {
    return {
      list: this.heroesList
    };
  },
  computed: {
    disabled_in() {
      const { currentSector } = this;
      const army_in_town = currentSector.town.army.units;
      return army_in_town.length === 0;
    }
  },
  watch: {
    heroesList: {
      deep: true,
      handler(e) {
        this.list = e;
      }
    }
  },
  methods: {
    getHeroesAvatar(hero) {
      const { races } = this.globalConfig;
      return races.heroes.getHeroImg(hero.race, hero.type);
    },
    mergeArmy(index, way) {
      const hero = this.list[index];
      const message = {
        type: "mergeArmy",
        data: {
          id: hero._id,
          way,
          sectorIndex: this.$store.state.userSectors.sectors.indexOf(
            this.currentSector
          )
        }
      };
      this.$ws.get(message).then(res => {});
    }
  }
};
</script>

<style lang="scss">
.heroes-in-town {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__item {
    display: flex;
    &--img {
      flex-basis: 17%;
      padding: 3px;
      & > img {
        width: 100%;
      }
    }
    &__control {
      display: flex;
      flex-direction: column;
      width: 15px;
      overflow: hidden;
      &--item {
        width: 100%;
      }
    }
    &__content {
      display: flex;
      flex-direction: column;
      max-width: 75%;

      &__info {
        display: flex;
        padding: 3px;
        &--name {
          font-size: 16px;
          font-weight: bold;
          margin-right: 10px;
          @media (min-width: $tablet) {
            font-size: 14px;
          }
        }
        &--lvl {
          font-size: 14px;
          @media (min-width: $tablet) {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
