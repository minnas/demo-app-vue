<template>
  <div class="awesome-hello-page">
    <div class="new-awesome-todo">
      <textarea
        class="todo-title-area"
        v-model="todoText"
        placeholder="write here todo task"
      ></textarea>
      <AwesomeButton @click="addTodo" :icon="faPlus" />
    </div>
    <div class="card">Now {{ count }} todos</div>
    <div class="card">
      <AwesomeButton @click="gotoTodos" :icon="faArrowRight" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useStore } from "@Store/store";
import { Todo } from "@Types/types";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { default as AwesomeButton } from "@Tools/AwesomeButton.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    const todoText = ref("");
    const addTodo = () => {
      const todo = { title: todoText.value } as Todo;
      store.dispatch("addTodo", todo);
      todoText.value = "";
    };
    const gotoTodos = () => {
      router.push("/todos");
    };
    const count = computed(() => store.state.todos.length);

    return {
      count,
      addTodo,
      gotoTodos,
      faPlus,
      todoText,
      faArrowRight,
    };
  },
  components: {
    AwesomeButton,
  },
});
</script>
<style lang="scss" scoped>
.awesome-hello-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .new-awesome-todo {
    display: flex;
  }
}
.todo-title-area {
  padding: 1rem;
  font-size: 1.2rem;
  width: 80%;
}
</style>
