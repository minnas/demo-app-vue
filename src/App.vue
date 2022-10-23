<template>
  <h1 class="awesome-title-or-footer"><AwesomeHeader title="title" /></h1>
  <div class="awesome-content"><router-view></router-view></div>
  <div class="awesome-title-or-footer"><AwesomeFooter /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { default as AwesomeFooter } from "@Views/AwesomeFooter.vue";
import { default as AwesomeHeader } from "@Views/AwesomeHeader.vue";
export default defineComponent({
  props: {},
  components: {
    AwesomeFooter,
    AwesomeHeader,
  },
  setup(props) {},
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.awesome-title-or-footer {
  flex: 1;
  width: 100%;
}
.awesome-content {
  flex: 8;
  overflow: scroll;
  width: 100%;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
