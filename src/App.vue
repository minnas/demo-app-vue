<template>
  <div :style="styles" class="app-theme-tools">
    <locale-switch />
    <theme-switch />
  </div>
  <div :style="styles" class="awesome-title-or-footer">
    <AwesomeHeader title="title" />
  </div>
  <div :style="styles" class="awesome-content"><router-view></router-view></div>
  <div :style="styles" class="awesome-title-or-footer"><AwesomeFooter /></div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { default as AwesomeFooter } from "@Views/AwesomeFooter.vue";
import { default as AwesomeHeader } from "@Views/AwesomeHeader.vue";
import { IThemeProvider, THEME_PROVIDER_KEY } from "@Provider/provider";
import { styles } from "@Utils/styles";

export default defineComponent({
  props: {},
  components: {
    AwesomeFooter,
    AwesomeHeader,
  },
  setup(props) {
    const themeProvider = inject<IThemeProvider>(THEME_PROVIDER_KEY);
    const mode = computed(() => themeProvider?.getCurrentTheme());
    const daa = computed(() => styles(mode.value || "dark"));
    return {
      styles: daa,
    };
  },
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.awesome-title-or-footer {
  flex: 1;
  width: 100%;
  padding: 0.5rem 0;
  margin: 0;
  align-items: center;
  background-color: var(--highlight-color-1);
}
.awesome-content {
  flex: 8;
  overflow: scroll;
  width: 100%;
  display: flex;
  justify-content: center;
}
.app-theme-tools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
