<template>
  <div class="all-awesome-footer-links">
    <awesome-button
      v-for="(item, i) of myPaths"
      :key="i"
      @click="goWhereYouLike(item.path)"
      :class="['awesome-button', { selected: matches(item.path) }]"
      :icon="item.icon"
      :disabled="matches(item.path) || false"
      :type="myBtnType"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import {
  faHome,
  faStickyNote,
  faBook,
  faBookmark,
  faMessage,
  faDharmachakra,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonType } from "@Tools/settings";
import { NavItem } from "@Types/types";

export default defineComponent({
  props: {
    text: String,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const currentPath = computed(() => router.currentRoute.value.name);

    const myPaths: NavItem[] = [
      {
        path: "/home",
        icon: faHome,
      },
      {
        path: "/todos",
        icon: faStickyNote,
      },
      {
        path: "/posts",
        icon: faBook,
      },
      {
        path: "/bookmarks",
        icon: faBookmark,
      },
      {
        path: "/items",
        icon: faMessage,
      },
      {
        path: "/carousel",
        icon: faDharmachakra,
      },
    ];

    const goWhereYouLike = (path: string) => {
      router.push(path);
    };
    const matches = (s: string) => {
      return (
        currentPath?.value && s.indexOf(currentPath?.value?.toString()) > -1
      );
    };
    return {
      goWhereYouLike,
      myPaths,
      router,
      currentPath,
      matches,
      myBtnType: ButtonType.ICON,
    };
  },
});
</script>
<style lang="scss" scoped>
.all-awesome-footer-links {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
</style>
