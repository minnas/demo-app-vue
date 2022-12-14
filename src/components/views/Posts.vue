<template>
  <div class="awesome-posts">
    <div class="awesome-post-list">
      <div v-if="loading && posts.length < 1" class="my-awesome-placeholder">
        <font-awesome-icon
          size="lg"
          :icon="faSpinner"
          :spin="true"
          class="placehoder-icon"
        />
        <span>{{ t("loading-placeholder-mgs") }}</span>
      </div>
      <div class="my-awesome-placeholder awesome-mgs" v-show="bookmarkAdded">
        <font-awesome-icon size="lg" :icon="faCheck" class="placehoder-icon" />
        <span>{{ t("post-to-bookmarks-mgs") }}</span>
      </div>
      <div class="awesome-post-item" v-for="(item, i) of posts" :key="i">
        <div class="awesome-display-mode">
          <font-awesome-icon
            :icon="faBookOpen"
            size="lg"
            class="awesome-icon"
          />
          <div>{{ item.title }}</div>
          <div class="some-actions">
            <awesome-button
              :icon="faBookmark"
              class="add-awesome-bookmark"
              @click="add(item)"
              :disabled="bookmarkBtnDisabled(item.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Item, RawItem, Bookmark } from "@Types/types";
import {
  faBookOpen,
  faBookmark,
  faSpinner,
  faCheck,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { search } from "@Api/api";
import { useRouter } from "vue-router";
import { useDispath, useSelector } from "@Store/react-redux/utils";
import { addBookmark } from "@Store/react-redux/dataSlices";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const { t } = useI18n();
    const bookmarkAdded = ref(false);
    const posts = ref([] as Item[]);
    const loading = ref(true);
    const router = useRouter();
    const bookmarks = useSelector((state) => state.bookmarks);
    const dispatch = useDispath();

    const bookmarkBtnDisabled = (id: string) => {
      if (
        (bookmarks.value as Bookmark[]).find(
          (b: Bookmark) =>
            b.externalId && b.externalId.toString() === id.toString()
        )
      ) {
        return true;
      }
      return false;
    };
    const add = (item: Item) => {
      const bookmark = { ...(item as RawItem), externalId: item.id };
      dispatch(addBookmark(bookmark));
      bookmarkAdded.value = true;
      setTimeout(() => {
        bookmarkAdded.value = false;
      }, 500);
    };

    onMounted(() => {
      search()
        .then((response) => {
          posts.value = response as Item[];
          loading.value = false;
        })
        .catch((e) => {
          console.log("Error " + e);
          loading.value = false;
        });
    });

    return {
      add,
      faBookOpen,
      faBookmark,
      faSpinner,
      faCheck,
      bookmarkAdded,
      loading,
      posts,
      faExclamation,
      bookmarkBtnDisabled,
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-posts {
  transition: all 0.25s ease;
  width: 80vw;
  & .awesome-post-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }
  & .awesome-post-item {
    margin-top: 1rem;
    padding: 2rem;
    width: 80%;
    border: 2px solid var(--highlight-color-4);
    border-bottom-left-radius: 18px;
    border-top-right-radius: 18px;
    font-size: 1.2rem;
  }
  & .awesome-icon {
    color: var(--highlight-color);
    font-size: 1.8rem;
    opacity: 0.9;
  }
  & .awesome-display-mode {
    display: flex;
    justify-content: space-between;
    grid-column-gap: 1rem;
    overflow-wrap: break-word;
  }
  & .my-awesome-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-gap: 1rem;
    font-size: 1.6rem;
    &.awesome-mgs {
      background-color: var(--highlight-color-5);
      border: 3px solid var(--border-color-dark);
      border-radius: 5px;
      position: absolute;
      width: 30vw;
      top: 30%;
      height: 45px;
      z-index: 100;
      & span {
        color: var(--color-black-6);
      }
    }
  }
  & .placehoder-icon {
    color: var(--highlight-color);
  }
}
</style>
