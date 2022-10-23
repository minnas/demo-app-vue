<template>
  <div class="awesome-header">
    <font-awesome-icon :icon="faSpider" size="lg" class="awesome-header-icon" />
    <div>One small Demo App</div>
  </div>
</template>
<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
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
    font-size: 1.6rem;
  }
}
</style>
