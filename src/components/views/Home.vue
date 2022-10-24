<template>
  <div class="awesome-hello-page">
    <div class="new-awesome-todo">
      <textarea
        class="todo-title-area"
        v-model="todoText"
        placeholder="write here todo task"
        @keydown="saveTodo"
        ref="textAreaRef"
      ></textarea>
      <awesome-button @click="add" :icon="faPlus" />
    </div>
    <div class="row-item">
      Now <span class="todo-count">{{(todos as Todo[]).length}}</span> todos
    </div>
    <div class="row-item">
      <awesome-button
        @click="gotoTodos"
        :icon="faArrowRight"
        label="Goto Todos"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import { Todo } from "@Types/types";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";
import { useDispath, useSelector } from "@Store/react-redux/utils";
import { addTodo } from "@Store/react-redux/dataSlices";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const dispatch = useDispath();
    const router = useRouter();
    const textAreaRef = ref();
    const todoText = ref("");
    const todos = useSelector((state) => state.todos);
    
    const add = () => {
      if (todoText.value.trim().length < 1) {
        return;
      }
      const todo = { title: todoText.value } as Todo;
      dispatch(addTodo(todo));
      todoText.value = "";
    };
    const gotoTodos = () => {
      router.push("/todos");
    };

    const saveTodo = (e: KeyboardEvent) => {
      const code = e.key;
      if (code === "Enter") {
        add();
        textAreaRef?.value?.blur();
      }
      return false;
    };

    return {
      add,
      gotoTodos,
      faPlus,
      todoText,
      faArrowRight,
      saveTodo,
      todos,
      textAreaRef,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-hello-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-row-gap: 1rem;
  & .new-awesome-todo {
    display: flex;
  }
}
.todo-title-area {
  padding: 1rem;
  font-size: 1.2rem;
  width: 60vw;
}
.todo-count {
  color: rgba(148, 104, 254);
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0.25rem;
}
</style>
