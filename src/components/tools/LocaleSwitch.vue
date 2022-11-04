<template>
  <div class="some-locale-switch">
    <button
      v-for="(loc, i) of locales"
      :key="i"
      @click="
        () => {
          $i18n.locale = loc;
        }
      "
      :class="['locale-btn', { selected: $i18n.locale == loc }]"
    >
      {{ loc.toLocaleUpperCase() }}
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    return {
      locales: ["en", "fi"],
    };
  },
});
</script>

<style lang="scss" scoped>
.some-locale-switch {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-column-gap: 1rem;
  align-self: flex-start;
}
.locale-btn {
  color: var(--highlight-color);
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  border-radius: 0;
  border-bottom: 2px solid transparent;
  &.selected {
    border-bottom: 2px solid var(--highlight-color);
  }
}
</style>
