<template>
  <div class="all-awesome-footer-links">
    <AwesomeButton
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
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { faHome, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { default as AwesomeButton } from "@Tools/AwesomeButton.vue";
import { ButtonType } from "@Tools/settings";

export default defineComponent({
  props: {
    text: String,
  },
  components: {
    AwesomeButton,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const currentPath = computed(() => router.currentRoute.value.name);

    const myPaths = [
      {
        path: "/home",
        icon: faHome,
      },
      {
        path: "/todos",
        icon: faStickyNote,
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
}
</style>
