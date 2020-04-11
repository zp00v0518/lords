<template>
  <div class="worldmap-region">
    <div class="worldmap-region__title">
      <div
        class="worldmap-region__title--txt"
      >{{upperFirstSymbol(gloss.dialog.questions.createNewTown.txt)}}</div>
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
    <div class="worldmap-region__body" ref="body">
      <RegionMap :regionMap="data.targetTile.region" mode="dialog"></RegionMap>
    </div>
    <div class="worldmap-region__footer">
      <div class="worldmap-region__footer__price">
        <div class="worldmap-region__footer__price--item">
          <div
            class="worldmap-region__footer__price__resource"
            v-for="(value, name) in sources"
            :key="name"
          >
            <div class="worldmap-region__footer__price__resource--icon">
              <img :src="'img/resources/'+name+'.gif'" />
            </div>
            <div class="worldmap-region__footer__price__resource--sum">{{value}}</div>
          </div>
        </div>
        <div class="worldmap-region__footer__price--item">
          <div class="worldmap-region__footer__price__resource">
            <div class="text">{{ upperFirstSymbol(gloss.date.time.txt) }}</div>
            <div class="value">{{ timeText }}</div>
          </div>
        </div>
      </div>

      <div class="worldmap-region__footer__gui">
        <GuiBtn type="ok" class="worldmap-region__footer__gui--btn" :disabled="createDisabled" />
        <GuiBtn type="cancel" class="worldmap-region__footer__gui--btn" @click="closeDialogWindow" />
      </div>
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';
import { currentSector, glossary } from '../../../../mixins';

import RegionMap from '../../../Scenes/RegionMap/RegionMap';

export default {
  name: 'WorldMapRegion',
  components: { RegionMap },
  mixins: [closeMixin, currentSector, glossary],
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      sources: {},
      timeText: 1234
    };
  },
  created() {
    this.sources = this.getSourceForBuilding();
    console.log(this.currentSector);
  },
  computed: {
    activeHero() {
      const { activeHeroId, heroesList } = this.$store.state.heroes;
      return heroesList.find(i => i._id === activeHeroId);
    },
    heroInTown() {
      const { activeHero, currentSector } = this;
      if (!activeHero) return false;
      const { heroes } = currentSector;
      return Array.isArray(heroes) && heroes.includes(activeHero._id);
    },
    createDisabled() {
      return !this.activeHero || !this.heroInTown;
    }
  },
  watch: {
    createDisabled: {
      immediate: true,
      handler(e) {
        this.setTimeText();
      }
    }
  },
  methods: {
    getSourceForBuilding() {
      const { Town } = this.globalConfig.all;
      return Town.getSourceForNewTown();
    },
    setTimeText() {
      const { createDisabled, gloss, upperFirstSymbol } = this;
      if (createDisabled) {
        this.timeText = upperFirstSymbol(gloss.dialog.chooseHero.txt);
        return;
      }
      const { data, currentSector } = this;
      const { targetTile } = data;
      console.log(targetTile);
      this.timeText = 222;
    }
  }
};
</script>

<style lang="scss">
.worldmap-region {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__title {
    display: flex;
    justify-content: flex-end;
    &--txt {
      flex-grow: 2;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
    }
  }
  &__body {
    height: 60%;
    flex-grow: 2;
  }
  &__tooltip {
    position: absolute;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    height: 30%;
    min-height: 100px;
    padding: 10px;
    &__price {
      margin-bottom: 10px;
      display: flex;
      &--item {
        width: 45%;
        margin: 10px;
        @include center;
      }
      &__resource {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
      }
    }
    &__gui {
      display: flex;
      justify-content: center;
      &--btn {
        margin: 15px 20px;
      }
    }
  }
}
</style>
