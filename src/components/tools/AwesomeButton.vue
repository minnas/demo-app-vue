<template>
  <button
    :title="label"
    :aria-label="label"
    :disabled="disabled"
    :class="className"
  >
    <font-awesome-icon v-if="!noIcon" :icon="icon" size="lg" />
    <span class="btn-label" v-if="!noText">{{ label }}</span>
  </button>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonType } from "./settings";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {
    icon: Object as () => IconProp,
    label: String,
    disabled: Boolean,
    type: Number,
    className: String,
  },
  setup(props, { emit }) {
    const noText = computed(
      () => (props.type && props.type == ButtonType.ICON) || !props.label
    );
    const noIcon = computed(() => props.type && props.type == ButtonType.TEXT);
    const icon = props.icon || faTimes;

    return {
      noText,
      icon,
      noIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  color: var(--highlight-color);
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-gap: 1rem;
  &.selected {
    color: var(--highlight-color-3);
    &:hover {
      cursor: not-allowed;
      border: none;
    }
  }
  &[disabled]:not(.selected) {
    opacity: 0.5;
    &:hover {
      cursor: not-allowed;
      border: none;
    }
  }
  &:not([disabled]):hover {
    color: var(--highlight-color-5);
    font-size: 1.2rem;
  }
}
</style>
