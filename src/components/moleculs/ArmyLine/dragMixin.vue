<script>
export default {
  data() {
    return {
      timerId: null,
      dataTransfer: {}
    };
  },
  methods: {
    handlerDragStart(event, dataTransfer) {
      const { offsetX, offsetY } = event;
      this.dataTransfer = dataTransfer;
      this.dataTransfer.offsetX = offsetX;
      this.dataTransfer.offsetY = offsetY;
      const drag_item = event.target.closest("[drag-item]");
      this.dataTransfer.drag_item = drag_item;
      const drag_container = drag_item.closest("[drag-container]");
      this.dataTransfer.drag_container = drag_container;
      this.dataTransfer.containerStyle = drag_container.getBoundingClientRect();
      const drag_item_clone = drag_item.cloneNode("deep");
      this.dataTransfer.drag_item_clone = drag_item_clone;
      drag_item_clone.style.cursor = "grabbing";
      drag_item_clone.style.opacity = "0.7";
      drag_item_clone.style.backgroundColor = "white";
      drag_item_clone.style.position = "fixed";
      drag_item_clone.style.transitionDuration = "unset";
      drag_item_clone.style.zIndex = 9999;
      this.setPositionElem(drag_item_clone, event);
      document.body.appendChild(drag_item_clone);
      document.addEventListener("mousemove", this.handlerMouseMove);
      document.addEventListener("mouseup", this.stopDrag);
      drag_item_clone.addEventListener("dragstart", e => {
        e.preventDefault();
      });
    },
    handlerMouseMove(event) {
      const { dataTransfer } = this;
      this.setPositionElem(dataTransfer.drag_item_clone, event);
      if (!this.checkDragInContainer(event)) {
        this.stopDrag();
        return;
      }
    },
    checkDragInContainer(mouseEvent) {
      const { clientX, clientY } = mouseEvent;
      const css = this.dataTransfer.containerStyle;
      if (clientX < css.left || clientX > css.left + css.width) return false;
      if (clientY < css.top || clientY > css.top + css.height) return false;
      return true;
    },
    setPositionElem(elem, mouseEvent) {
      const { clientX, clientY } = mouseEvent;
      const { dataTransfer } = this;
      elem.style.top = clientY - dataTransfer.offsetY + "px";
      elem.style.left = clientX - dataTransfer.offsetX + "px";
    },
    stopDrag() {
      document.removeEventListener("mousemove", this.handlerMouseMove);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    handlerMouseDown(event, { itemIndex, allValue }, callback) {
      if (this.timerId) {
        this.timerId = clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        // eslint-disable-next-line
        callback(...arguments);
      }, 100);
    },
    handlerMouseUp() {
      clearTimeout(this.timerId);
    }
  }
};
</script>
