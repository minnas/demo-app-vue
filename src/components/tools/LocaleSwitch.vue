<template>
  <div class="some-locale-switch">
    <button
      v-for="(loc, i) of locales"
      :key="i"
      @click="changeLocale(loc)"
      :class="['locale-btn', { selected: selected(loc) }]"
    >
      {{ loc.toLocaleUpperCase() }}
    </button>
    <select name="option" class="some-select-test" v-model="locale">
      <option v-for="(loc, i) of locales" :value="loc">
        {{ loc.toLocaleUpperCase() }}
      </option>
    </select>
    <select name="option" class="some-select-test" v-model="dummyValue">
      <option v-for="(option, i) of dummyOptions" :value="option.id">
        {{ t(option.id) }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { Option } from "@Types/types";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const { t, locale } = useI18n();

    const changeLocale = (loc: string) => {
      locale.value = loc;
      localStorage.setItem("current-locale", loc);
    };

    const selected = (loc: string) => {
      return locale.value === loc;
    };

    const dummyOptions = computed(
      () =>
        <Option[]>(
          [{ id: "option-1" }, { id: "option-2" }, { id: "option-3" }].map(
            (item) => ({ ...item, label: t(item.id) })
          )
        )
    );

    watch(locale, (value) => {
      if (value) {
        localStorage.setItem("current-locale", value as string);
      }
    });

    const dummyValue = ref(dummyOptions.value.at(0)?.id as string);
    return {
      locales: ["en", "fi"],
      dummyOptions,
      dummyValue,
      changeLocale,
      selected,
      t,
      locale,
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
  appearance: none;
  -moz-appearance: none;
  cursor: pointer;
}
</style>
