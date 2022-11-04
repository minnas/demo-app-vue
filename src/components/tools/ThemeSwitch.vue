<template>
  <div class="some-theme-switch">
    <button @click="toggleTheme">
      <font-awesome-icon :icon="faMagicWandSparkles" size="lg" />
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { IThemeProvider, THEME_PROVIDER_KEY } from "@Provider/provider";
import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const themeProvider = inject<IThemeProvider>(THEME_PROVIDER_KEY);

    const toggleTheme = () => {
      themeProvider?.toggleTheme();
      document.documentElement.style.colorScheme =
        themeProvider?.getCurrentTheme() || "dark";
    };

    return {
      faMagicWandSparkles,
      toggleTheme,
    };
  },
});
</script>

<style lang="scss" scoped>
.some-theme-switch {
  color: var(--highlight-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & button {
    color: var(--highlight-color);
    outline: none;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    justify-content: center;
    border: none;
    background-color: transparent;
  }
}
</style>
