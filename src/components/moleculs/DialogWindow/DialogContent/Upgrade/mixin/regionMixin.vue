<script>
export default {
  data() {
    return {
      info: {
        url: "img/resources/" + this.data.building.type + ".gif",
        text: ["Lorem ipsum dolor sit amet.", "2 Lorem ipsum dolor sit amet."]
      }
    };
  },
  computed: {
    upgrade() {
      return {
        time: this.getTimeString(
          this.$var.mine.getTimeUpgrade(this.building.lvl, this.rangeValue)
        ),
        source: this.$var.mine.getResourcesForUpgrade(
          this.building.lvl,
          this.rangeValue
        )
      };
    },
    checkMaxLvl() {
      if (this.building.lvl >= this.$var.mine.valueUpgrade.length - 1) {
        return true;
      }
      return false;
    }
  },
  methods: {
    upgradeBuilding() {
      if (this.checkMaxLvl) {
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
    }
  }
};
</script>
