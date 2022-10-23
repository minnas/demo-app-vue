<template>
  <div class="awesome-header">
    <font-awesome-icon :icon="faSpider" size="lg" class="awesome-header-icon" />
    <div>One small Demo App</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { faSpider } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {
    title: String,
  },
  setup(props, { emit }) {
    return {
      faSpider,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  grid-column-gap: 1rem;
  & .awesome-header-icon {
    color: rgba(148, 104, 254);
    font-size: 2.6rem;
    filter: drop-shadow(14px 15px 0px rgba(255, 255, 255, 0.4));
  }
}
</style>
