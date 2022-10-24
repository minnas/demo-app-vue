<template>
  <div class="awesome-header">
    <font-awesome-icon :icon="faSpider" size="lg" class="awesome-header-icon" />
    <h1>One small Demo App</h1>
    <font-awesome-icon
      :icon="faSnowflake"
      size="lg"
      class="awesome-header-icon"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { faSnowflake, faSpider } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {
    title: String,
  },
  setup(props, { emit }) {
    return {
      faSpider,
      faSnowflake,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  grid-column-gap: 1rem;
  & .awesome-header-icon {
    color: rgba(148, 104, 254);
    font-size: 2.6rem;
    filter: drop-shadow(14px 15px 0px rgba(255, 255, 255, 0.4));
  }
  & h1 {
    font-size: 2.5rem;
    line-height: 2.6rem;
    margin: 0;
    padding: 5px 0;
    border-bottom: 4px dashed rgba(148, 104, 254, 0.6);
  }
}
</style>
