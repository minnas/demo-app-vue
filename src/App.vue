<template>
  <div class="awesome-title-or-footer"><AwesomeHeader title="title" /></div>
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
  padding: 0.5rem 0;
  margin: 0;
  align-items: center;
  background-color: rgba(148, 104, 254, 0.1);
}
.awesome-content {
  flex: 8;
  overflow: scroll;
  width: 100%;
  display: flex;
  justify-content: center;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
