<script>
export default {
  data() {
    return {
      info: {
        url: '',
        text: ['Lorem ipsum dolor sit amet.', '2 Lorem ipsum dolor sit amet.']
      },
      in_gold: 0,
      building: this.data.building,
      build_from_db: null
    };
  },
  created() {
    this.in_gold = this.$var.resources.getInGold(this.nextBuilding.price);
    const type = this.building.type;
    this.build_from_db = this.currentSector.town[type];
  },
  computed: {
    nextBuilding() {
      const nextLvl = this.data.building.nextLvl;
      return this.data.building.lvl[nextLvl];
    },
    upgrade() {
      const sec = this.in_gold * this.$var.time.sec;
      const seconds = sec / this.$var.time.speedGame;
      const town = this.$var.town;
      const index = this.$var.indexes.upgrade_town;
      const rangeValue = this.rangeValue;
      return {
        time: this.getAsTimeString(town.getTimeForUpgrade(seconds, rangeValue, index)),
        source: town.getResourcesForUpgrade(this.nextBuilding.price, rangeValue, index)
      };
    },
    checkMaxLvl() {
      if (this.nextBuilding) {
        return false;
      }
      return true;
    }
  },
  methods: {
    upgradeBuilding() {
      if (this.checkMaxLvl) {
        this.$store.commit('DIALOG_CLOSE');
        return;
      }
      if (this.build_from_db.upgrade.is) {
        const dialog = {
          data: { txt: this.gloss.dialog.isUpgrade.txt },
          type: 'message'
        };
        this.$store.dispatch('DIALOG_SHOW', dialog);
        return;
      }
      const isSources = this.Resources.checkSource(this.upgrade.source, this.data.storage);
      if (isSources) {
        const { $store, currentSector } = this;
        const sectorIndex = $store.state.userSectors.sectors.findIndex(i => i._id === currentSector._id);
        const message = {
          type: 'upgradeBuilding',
          data: {
            sectorIndex,
            persent: +this.rangeValue,
            building: {
              type: this.build_from_db.type || this.build_from_db.class
            }
          }
        };
        this.$ws.sendMessage(message);
        this.$store.commit('DIALOG_CLOSE');
      } else {
        const dialog = {
          data: { txt: this.gloss.dialog.notResources.txt },
          type: 'message'
        };
        this.$store.dispatch('DIALOG_SHOW', dialog);
      }
    },
    darwTumb() {
      const ref = this.$refs.tumb;
      const elem = this.data.tumb.elem.cloneNode();
      const img = this.data.tumb.img;
      const coords = this.data.tumb.coords;
      elem.style.width = '70%';
      elem.style.height = '70%';
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, coords.x, coords.y, 150, 70, 0, 0, elem.width, elem.height);
      ref.parentNode.replaceChild(elem, ref);
    }
  },
  mounted() {
    this.darwTumb();
  }
};
</script>
