<template>
  <div class="awesome-posts">
    <div class="row-item">
      <awesome-button
        @click="gotoBookmarks"
        :icon="faBookAtlas"
        label="Goto Bookmarks"
        v-if="!loading"
      />
    </div>
    <div class="awesome-post-list">
      <div v-if="loading && posts.length < 1" class="my-awesome-placeholder">
        <font-awesome-icon
          size="lg"
          :icon="faSpinner"
          :spin="true"
          class="placehoder-icon"
        />
        <span>Loading ...</span>
      </div>
      <div class="my-awesome-placeholder awesome-mgs" v-show="bookmarkAdded">
        <font-awesome-icon size="lg" :icon="faCheck" class="placehoder-icon" />
        <span>Added to bookmarks</span>
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
              @click="addBookmark(item)"
              :disabled="bookmarkBtnDisabled(item.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "@vue/reactivity";
import { defineComponent, onMounted } from "vue";
import { useStore } from "@Store/store";
import { Item, RawItem, Bookmark } from "@Types/types";
import {
  faBookOpen,
  faBookmark,
  faSpinner,
  faCheck,
  faBookAtlas,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { search } from "@Api/api";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const store = useStore();
    const bookmarkAdded = ref(false);
    const posts = ref([] as Item[]);
    const loading = ref(true);
    const router = useRouter();
    const bookmarks = computed(() => store.state.bookmarks);

    const bookmarkBtnDisabled = (id: string) => {
      return bookmarks.value.find((b: Bookmark) => {
        return b.externalId.toString() === id.toString();
      });
    };
    const addBookmark = (item: Item) => {
      const bookmark = { ...(item as RawItem), externalId: item.id };
      store.dispatch("addBookmark", bookmark);
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

    const gotoBookmarks = () => {
      router.push("/bookmarks");
    };

    return {
      addBookmark,
      faBookOpen,
      faBookmark,
      faSpinner,
      faCheck,
      faBookAtlas,
      bookmarkAdded,
      loading,
      posts,
      gotoBookmarks,
      faExclamation,
      bookmarkBtnDisabled,
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
      background-color: rgba(148, 104, 254, 0.5);
      border: 3px solid #1a1a1a;
      border-radius: 5px;
      position: absolute;
      width: 30vw;
      top: 20vh;
      height: 45px;
      z-index: 100;
      & span {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  & .placehoder-icon {
    color: rgba(148, 104, 254);
  }
}
.row-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
