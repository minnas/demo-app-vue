<template>
  <div class="all-awesome-items">
    <div class="awesome-items-list">
      <div v-if="(items as Item[]).length < 1" class="my-awesome-placeholder">
        <font-awesome-icon
          size="lg"
          :icon="faSadTear"
          class="placehoder-icon"
        />
        <span>{{ $t("items-placeholder") }}</span>
      </div>
      <div class="awesome-item" v-for="(item, i) of (items as Item[])" :key="i">
        <div class="awesome-display-mode">
          <font-awesome-icon :icon="faMessage" size="lg" class="awesome-icon" />
          <div>{{ item.title }}</div>
          <div class="some-actions">
            <awesome-button
              :icon="faBroom"
              class="remove-awesome-todo"
              @click="removeItem(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { Item } from "@Types/types";
import {
  faBroom,
  faSadTear,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { IItemStoreProvider, ITEM_PROVIDER_KEY } from "@Provider/provider";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const itemStoreProvider = inject<IItemStoreProvider>(ITEM_PROVIDER_KEY);
    const items = computed(() => itemStoreProvider?.getItems());
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const removeItem = (item: Item) => {
      itemStoreProvider?.removeItem(item);
    };

    return {
      items,
      removeItem,
      faMessage,
      faBroom,
      faSadTear,
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
.all-awesome-items {
  transition: all 0.25s ease;
  width: 60vw;
  & .awesome-item-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }
  & .awesome-item {
    margin-top: 1rem;
    padding: 2rem;
    width: 80%;
    border: 2px solid var(--highlight-color-4);
    border-bottom-left-radius: 18px;
    border-top-right-radius: 18px;
    font-size: 1.2rem;
    animation: fadeIn 2s ease-in;
  }
  & .awesome-icon {
    color: var(--highlight-color);
    font-size: 1.8rem;
    opacity: 0.9;
  }
  & .awesome-display-mode {
    display: flex;
    justify-content: space-between;
  }
  & .my-awesome-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-gap: 1rem;
    font-size: 1.6rem;
    min-height: 100px;
    animation: fadeIn 2s ease-in;
  }
  & .placehoder-icon {
    color: var(--highlight-color);
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
