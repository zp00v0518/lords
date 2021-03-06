<template>
  <div class="worldmap-region">
    <div class="worldmap-region__title">
      <div
        class="worldmap-region__title--txt"
      >{{upperFirstSymbol(headerTxt)}}</div>
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow" />
    </div>
    <div class="worldmap-region__body" ref="body">
      <RegionMap :regionMap="data.targetTile.region" mode="dialog" :sectorInfo="{raceIndex: -1}"/>
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
        <GuiBtn
          type="ok"
          class="worldmap-region__footer__gui--btn"
          @click="buildNewTown"
          :disabled="createDisabled || isAlienZone"
        />
        <GuiBtn type="cancel" class="worldmap-region__footer__gui--btn" @click="closeDialogWindow" />
      </div>
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';
import { currentSector } from '../../../../mixins';
import { getAsTimeString } from '../../../../../utils';

import RegionMap from '../../../Scenes/RegionMap/RegionMap';

export default {
  name: 'WorldMapRegion',
  components: { RegionMap },
  mixins: [closeMixin, currentSector],
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      sources: null,
      timeText: ''
    };
  },
  created() {
    this.sources = this.getSourceForBuilding();
  },
  computed: {
    headerTxt() {
      const { isAlienZone, gloss } = this;
      const can = gloss.dialog.questions.buildNewTown.txt;
      const cannot = gloss.dialog.questions.buildNewTown.cannotBuild.txt;
      return isAlienZone ? cannot : can;
    },
    isAlienZone() {
      const { targetTile } = this.data;
      const { control } = targetTile;
      if (!control || !control.userId) return false;
      const userId = this.$store.state.user.id;
      return control.userId !== userId;
    },
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
      return !this.activeHero || !this.haveSources || !this.heroInTown;
    },
    haveSources() {
      const { sources, globalConfig, currentSector } = this;
      if (!sources) return false;
      const storage = currentSector.town && currentSector.town.storage && currentSector.town.storage.sources;
      if (!storage) return false;
      const { Resources } = globalConfig.all;
      const flag = Resources.checkSource(sources, storage);
      return flag;
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
    getAsTimeString,
    getSourceForBuilding() {
      const { Town } = this.globalConfig.all;
      const { sectors } = this.$store.state.userSectors;
      return Town.getSourceForNewTown(sectors.length + 1);
    },
    setTimeText() {
      const { createDisabled, gloss, upperFirstSymbol } = this;
      if (createDisabled) {
        this.timeText = upperFirstSymbol(gloss.dialog.chooseHero.txt);
        return;
      }
      const time = this.getMoveTime();
      const str = this.getAsTimeString(time);
      this.timeText = str;
    },
    getMoveTime() {
      const { WorldMap } = this.globalConfig.all;
      const { data, currentSector } = this;
      const { targetTile } = data;
      return WorldMap.getTimeMoveOnMap(currentSector, targetTile);
    },
    async buildNewTown() {
      const { activeHero, createDisabled, $store, currentSector, data, gloss, globalConfig } = this;
      if (createDisabled) return;
      const { targetTile } = data;
      const sectorIndex = $store.state.userSectors.sectors.findIndex(i => i._id === currentSector._id);
      if (sectorIndex === -1) return;
      const evTypes = globalConfig.all.Event.types;
      const message = {
        type: evTypes.buildNewTown,
        data: {
          sectorIndex,
          heroId: activeHero._id,
          targetSector: targetTile._id
        }
      };
      this.closeDialogWindow();
      const res = await this.$ws.get(message);
      let txt = gloss.eventLang.eventResult[res.type][res.status].txt;
      if (!res.status && res.code === 'notEmpty') {
        const {questions} = gloss.dialog;
        txt = questions.buildNewTown.cannotBuild.txt;
      }
      const alert = {
        type: 'message',
        data: {
          txt
        }
      };
      this.$store.commit('DIALOG_SHOW', alert);
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
