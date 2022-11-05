<template>
  <div class="awesome-header">
    <font-awesome-icon
      :icon="faSpider"
      size="lg"
      class="awesome-header-icon spider"
    />
    <div>
      <h1>{{ t("vue-demo-app-title") }}</h1>
    </div>
    <theme-switch />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { faSpider } from "@fortawesome/free-solid-svg-icons";

import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    title: String,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    return {
      faSpider,
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  grid-column-gap: 1rem;
  & .awesome-header-icon {
    color: var(--highlight-color);
    font-size: 3rem;
    transition: all 0.25s ease;
    &:not(.spin) {
      filter: drop-shadow(14px 15px 0px var(--shadow-color-4));
      font-size: 2.6rem;
    }
    &.spider:hover {
      filter: drop-shadow(30px 30px 0px var(--shadow-color-4));
    }
  }
  & h1 {
    font-size: 2.5rem;
    line-height: 2.6rem;
    margin: 0;
    padding: 5px 0;
    border-bottom: 4px dashed var(--highlight-color-6);
    color: var(--highlight-color);
  }
  & .bottom-line {
    text-align: center;
    font-size: 1.2rem;
    font-style: italic;
    color: var(--shadow-color-5);
  }
  & button.awesome-lighting {
    color: var(--light-on);
    &.lightOff {
      color: var(--light-off);
    }
  }
  & .right-side {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column-gap: 1rem;
  }
}
</style>
