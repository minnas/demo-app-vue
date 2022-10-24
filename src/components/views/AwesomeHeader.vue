<template>
  <div class="awesome-header">
    <font-awesome-icon
      :icon="faSpider"
      size="lg"
      class="awesome-header-icon spider"
    />
    <div>
      <h1>One small Demo App</h1>
      <div class="bottom-line">(start/stop snowflake by click)</div>
    </div>
    <font-awesome-icon
      :icon="faSnowflake"
      size="lg"
      @click="toggleSpin"
      :spin="spin"
      class="awesome-header-icon spin"
    />
    <awesome-button
      :icon="faLightbulb"
      @click="toggleLight"
      :class="['awesome-lighting', { lightOff: lightOff }]"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  faSnowflake,
  faSpider,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {
    title: String,
  },
  setup(props, { emit }) {
    const spin = ref(true);
    const lightOff = ref(false);
    const toggleSpin = () => {
      spin.value = !spin.value;
    };
    const toggleLight = () => {
      lightOff.value = !lightOff.value;
      if (lightOff.value) {
        document.body.classList.add("light-off");
      } else {
        document.body.classList.remove("light-off");
      }
    };
    return {
      faSpider,
      faSnowflake,
      spin,
      toggleSpin,
      faLightbulb,
      lightOff,
      toggleLight,
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
    font-size: 3rem;
    transition: all 0.25s ease;
    &:not(.spin) {
      filter: drop-shadow(14px 15px 0px rgba(255, 255, 255, 0.4));
      font-size: 2.6rem;
    }
    &.spider:hover {
      filter: drop-shadow(30px 30px 0px rgba(255, 255, 255, 0.4));
    }
    &.spin:hover {
      cursor: pointer;
      filter: drop-shadow(20px 0px 0px rgba(255, 255, 255, 0.7));
    }
  }
  & h1 {
    font-size: 2.5rem;
    line-height: 2.6rem;
    margin: 0;
    padding: 5px 0;
    border-bottom: 4px dashed rgba(148, 104, 254, 0.6);
  }
  & .bottom-line {
    text-align: center;
    font-size: 1.2rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.5);
  }
  & button.awesome-lighting {
    color: #dde066;
    &.lightOff {
      color: #a9a9a9;
    }
  }
}
</style>
