<template>
  <div class="resource_item" :class="[name]">
    <div class="resource_icon"></div>
    <div class="resource_sum_wrap">
      <div class="resource_sum">{{Math.floor(resource.nowValue)}}</div>
      <div class="resource_count">+{{resource.addValue}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourceItem",
  props: ["resource", "name"]
};
</script>
