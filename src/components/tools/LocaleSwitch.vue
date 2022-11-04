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
    <select name="option" class="some-select-test" v-model="dummyValue">
      <option v-for="(option, i) of dummyOptions" :value="option.id">
        {{ option.label }}
      </option>
    </select>
    <div class="selected-option">
      {{ dummyOptions.find((d) => d.id === dummyValue)?.label }}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { dummyOptions, DummyOption } from "@Locale/utils";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const dummyValue = ref(dummyOptions.value.at(0)?.id as string);

    return {
      locales: ["en", "fi"],
      dummyOptions,
      dummyValue,
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
.some-select-test {
  border: 2px solid var(--highlight-color);
  border-radius: 5px;
  font-size: 1rem;
  background-color: transparent;
  color: var(--highlight-color);
  padding: 0.25rem;
  font-weight: 600;
}
.selected-option {
  color: var(--highlight-color);
  font-weight: 600;
  font-size: 1.6rem;
}
</style>
