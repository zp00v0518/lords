<template src="../Upgrade/upgarde_template.html"></template>

<script>
import { getTimeString } from "../modules";
import glossary from "../../../../mixins/glossary.vue";
import regionMixin from "../mixin/regionMixin";
import fromBackend from "@/fromBackend";
const checkSource = fromBackend.checkSource;

export default {
  name: "UpgradeBuilding",
  mixins: [glossary, regionMixin],
  props: {
    data: Object
  },
  data() {
    return {
      building: null,
      rangeValue: 100
      // info: {
      //   url: "img/resources/" + this.data.building.type + ".gif",
      //   text: ["Lorem ipsum dolor sit amet.", "2 Lorem ipsum dolor sit amet."]
      // }
    };
  },
  created() {
    this.building = this.data.building;
    this.$emit("set-height", { width: "80%", height: "80%" });
  },
  // computed: {
  //   upgrade() {
  //     return {
  //       time: this.getTimeString(
  //         this.$var.mine.getTimeUpgrade(this.building.lvl, this.rangeValue)
  //       ),
  //       source: this.$var.mine.getResourcesForUpgrade(
  //         this.building.lvl,
  //         this.rangeValue
  //       )
  //     };
  //   },
  //   currentSector() {
  //     return this.$store.state.userSectors.currentSector;
  //   },
  //   checkMaxLvl() {
  //     if (this.building.lvl >= this.$var.mine.valueUpgrade.length - 1) {
  //       return false;
  //     }
  //     return true;
  //   }
  // },
  methods: {
    getTimeString,
    checkSource
    // closeDialogWindow() {
    //   this.$store.commit("DIALOG_CLOSE");
    // },
    // upgradeBuilding() {
    //   if (!this.checkMaxLvl) {
    //     this.$store.commit("DIALOG_CLOSE");
    //     return;
    //   }
    //   if (this.building.upgrade.is) {
    //     const dialog = {
    //       data: { txt: this.gloss.dialog.isUpgrade.txt },
    //       type: "message"
    //     };
    //     this.$store.dispatch("DIALOG_SHOW", dialog);
    //     return;
    //   }
    //   const storageName = this.$var.classInstance.storage;
    //   if (
    //     this.checkSource(
    //       this.upgrade.source,
    //       this.currentSector.town[storageName].sources
    //     )
    //   ) {
    //     const message = {
    //       type: "upgradeRegion",
    //       data: {
    //         sectorIndex: this.$store.state.userSectors.sectors.indexOf(
    //           this.currentSector
    //         ),
    //         persent: +this.rangeValue,
    //         building: {
    //           type: this.building.type,
    //           x: this.data.x,
    //           y: this.data.y
    //         }
    //       }
    //     };
    //     this.$ws.sendMessage(message);
    //     this.$store.commit("DIALOG_CLOSE");
    //   } else {
    //     const dialog = {
    //       data: { txt: this.gloss.dialog.notResources.txt },
    //       type: "message"
    //     };
    //     this.$store.dispatch("DIALOG_SHOW", dialog);
    //   }
    // }
  }
};
</script>

<style lang='scss' scoped>
@import "upgrade_region.scss";
</style>
