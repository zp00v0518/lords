<script>
import { getTimeString } from "../../modules";
import glossary from "../../../../../mixins/glossary.vue";
import fromBackend from "../../../../../../fromBackend";
const checkSource = fromBackend.checkSource;

export default {
  name: "UpgradeRegion",
  mixins: [glossary],
  props: {
    data: Object
  },
  data() {
    return {
      building: null,
      rangeValue: 100
    };
  },
  created() {
    this.building = this.data.building;
    this.$emit("set-height", { width: "80%", height: "80%" });
  },
  computed: {
    currentSector() {
      return this.$store.state.userSectors.currentSector;
    }
  },
  methods: {
    getTimeString,
    checkSource,
    closeDialogWindow() {
      this.$store.commit("DIALOG_CLOSE");
    }
  }
};
</script>
