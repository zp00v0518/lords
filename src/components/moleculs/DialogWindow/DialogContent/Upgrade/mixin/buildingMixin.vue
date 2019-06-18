<script>
export default {
  data() {
    return {
      info: {
        url: "",
        text: ["Lorem ipsum dolor sit amet.", "2 Lorem ipsum dolor sit amet."]
      }
    };
  },
  created() {
    console.log(this.data);
  },
  computed: {
    upgrade() {
      return {
        time: this.getTimeString(
          this.$var.mine.getTimeUpgrade(this.building.lvl, this.rangeValue)
        ),
        source: this.data.building.price
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
