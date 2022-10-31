<template>
  <div class="awesome-hello-page">
    <div class="new-awesome-item">
      <textarea
        class="item-title-area"
        v-model="itemText"
        placeholder="write here item. Uses itemStoreProvider"
        @keydown="saveItemOnEnter"
        ref="textAreaRef1"
      ></textarea>
      <awesome-button @click="saveItem" :icon="faPlus" />
    </div>
    <div class="row-item">
      Now <span class="item-count">{{ (items as Item[]).length }}</span> items
    </div>
    <div class="new-awesome-todo">
      <textarea
        class="todo-title-area"
        v-model="todoText"
        placeholder="write here todo task. Uses Redux"
        @keydown="saveTodo"
        ref="textAreaRef2"
      ></textarea>
      <awesome-button @click="add" :icon="faPlus" />
    </div>
    <div class="row-item">
      Now <span class="todo-count">{{ (todos as Todo[]).length }}</span> todos
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
import { defineComponent, inject, reactive, ref, toRefs, computed } from "vue";
import { Item, Todo } from "@Types/types";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";
import { useDispath, useSelector } from "@Store/react-redux/utils";
import { addTodo } from "@Store/react-redux/dataSlices";
import {
  IItemStoreProvider,
  ItemStoreProvider,
  ITEM_PROVIDER_KEY,
} from "@Provider/provider";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const dispatch = useDispath();
    const router = useRouter();
    const options = reactive({
      todoText: "",
      itemText: "",
    });
    const textAreaRef1 = ref();
    const textAreaRef2 = ref();
    const todos = useSelector((state) => state.todos);
    const itemStoreProvider = inject<IItemStoreProvider>(ITEM_PROVIDER_KEY);
    const items = computed(() => ItemStoreProvider.getItems());

    const saveItem = () => {
      if (options.itemText.trim().length < 1) {
        return;
      }
      itemStoreProvider?.updateItem({ title: options.itemText } as Item);
      options.itemText = "";
    };

    const saveItemOnEnter = (e: KeyboardEvent) => {
      const code = e.key;
      if (code === "Enter") {
        saveItem();
        textAreaRef1?.value?.blur();
      }
      return false;
    };

    const add = () => {
      if (options.todoText.trim().length < 1) {
        return;
      }
      const todo = { title: options.todoText } as Todo;
      dispatch(addTodo(todo));
      options.todoText = "";
    };
    const gotoTodos = () => {
      router.push("/todos");
    };

    const saveTodo = (e: KeyboardEvent) => {
      const code = e.key;
      if (code === "Enter") {
        add();
        textAreaRef2?.value?.blur();
      }
      return false;
    };

    return {
      add,
      gotoTodos,
      faPlus,
      faArrowRight,
      saveTodo,
      todos,
      textAreaRef1,
      textAreaRef2,
      saveItem,
      saveItemOnEnter,
      items,
      ...toRefs(options),
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
  & .new-awesome-todo,
  & .new-awesome-item {
    display: flex;
  }
}
.todo-title-area,
.item-title-area {
  padding: 1rem;
  font-size: 1.2rem;
  width: 60vw;
}
.todo-count,
.item-count {
  color: var(--highlight-color);
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0.25rem;
}
</style>
