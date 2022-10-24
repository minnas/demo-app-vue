<template>
  <div class="awesome-bookmarks">
    <div class="awesome-bookmarks-list">
      <div v-if="bookmarks.length < 1" class="my-awesome-placeholder">
        <font-awesome-icon
          size="lg"
          :icon="faUserNinja"
          class="placehoder-icon"
        />
        <span>No bookmarks here !!</span>
      </div>
      <div
        class="awesome-bookmarks-item"
        v-for="(item, i) of bookmarks"
        :key="i"
      >
        <div class="awesome-display-mode">
          <font-awesome-icon
            :icon="faBookAtlas"
            size="lg"
            class="awesome-icon"
          />
          <div>{{ item.title }}</div>
          <div class="some-actions">
            <awesome-button
              :icon="faPaintBrush"
              class="remove-awesome-todo"
              @click="removeBookmark(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useStore } from "@Store/store";
import { Bookmark } from "@Types/types";
import {
  faBookAtlas,
  faPaintBrush,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const store = useStore();

    const bookmarks = computed(() => store.state.bookmarks);

    const removeBookmark = (bookmark: Bookmark) => {
      store.dispatch("removeBookmark", bookmark);
    };

    return {
      bookmarks,
      removeBookmark,
      faBookAtlas,
      faPaintBrush,
      faUserNinja,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-bookmarks {
  transition: all 0.25s ease;
  width: 60vw;
  & .awesome-bookmarks-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }
  & .awesome-bookmarks-item {
    margin-top: 1rem;
    padding: 2rem;
    width: 80%;
    border: 2px solid rgba(148, 104, 254, 0.4);
    border-bottom-left-radius: 18px;
    border-top-right-radius: 18px;
    font-size: 1.2rem;
  }
  & .awesome-icon {
    color: rgba(148, 104, 254);
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
  }
  & .placehoder-icon {
    color: rgba(148, 104, 254);
  }
}
</style>
