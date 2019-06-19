<script>
export default {
  data() {
    return {
      info: {
        url: "",
        text: ["Lorem ipsum dolor sit amet.", "2 Lorem ipsum dolor sit amet."]
      },
      in_gold: this.$var.resources.getInGold(this.data.building.price)
    };
  },
  // created() {
  //   console.log(this.$var);
  // },
  computed: {
    upgrade() {
      const seconds = this.in_gold * this.$var.time.sec;
      const town = this.$var.town;
      const index = this.$var.indexes.upgrade_town;
      const rangeValue = this.rangeValue;
      return {
        time: this.getTimeString(
          town.getTimeForUpgrade(seconds, rangeValue, index)
        ),
        source: town.getResoursesForUpgrade(
          this.data.building.price,
          rangeValue,
          index
        )
      };
    },
    currentSector() {
      return this.$store.state.userSectors.currentSector;
    },
    checkMaxLvl() {
      if (this.building.lvl >= this.$var.mine.valueUpgrade.length - 1) {
        return false;
      }
      return true;
    }
  },
  methods: {
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    },
    upgradeBuilding() {
      if (!this.checkMaxLvl) {
        this.$store.commit("DIALOG_CLOSE");
        return;
      }
      if (this.building.upgrade.is) {
        const dialog = {
          data: { txt: this.gloss.dialog.isUpgrade.txt },
          type: "message"
        };
        this.$store.dispatch("DIALOG_SHOW", dialog);
        return;
      }
      const storageName = this.$var.classInstance.storage;
      if (
        this.checkSource(
          this.upgrade.source,
          this.currentSector.town[storageName].sources
        )
      ) {
        const message = {
          type: "upgradeRegion",
          data: {
            sectorIndex: this.$store.state.userSectors.sectors.indexOf(
              this.currentSector
            ),
            persent: +this.rangeValue,
            building: {
              type: this.building.type,
              x: this.data.x,
              y: this.data.y
            }
          }
        };
        this.$ws.sendMessage(message);
        this.$store.commit("DIALOG_CLOSE");
      } else {
        const dialog = {
          data: { txt: this.gloss.dialog.notResources.txt },
          type: "message"
        };
        this.$store.dispatch("DIALOG_SHOW", dialog);
      }
    },
    darwTumb() {
      const ref = this.$refs.tumb;
      const elem = this.data.tumb.elem.cloneNode();
      const img = this.data.tumb.img;
      const coords = this.data.tumb.coords;
      elem.style.width = "70%";
      elem.style.height = "70%";
      const ctx = elem.getContext("2d");
      ctx.drawImage(
        img,
        coords.x,
        coords.y,
        150,
        70,
        0,
        0,
        elem.width,
        elem.height
      );
      ref.parentNode.replaceChild(elem, ref);
    }
  },
  mounted() {
    this.darwTumb();
  }
};
</script>
