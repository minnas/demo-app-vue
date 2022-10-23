<template>
  <div class="all-awesome-todos">
    <div class="awesome-todo-list">
      <div v-if="todos.length < 1" class="my-awesome-placeholder">
        <font-awesome-icon size="lg" :icon="faSadCry" class="placehoder-icon" />
        <span>No todos here !!</span>
      </div>
      <div class="awesome-todo-item" v-for="(item, i) of todos" :key="i">
        <div class="awesome-display-mode">
          <font-awesome-icon
            :icon="faStickyNote"
            size="lg"
            class="awesome-icon"
          />
          <div>{{ item.title }}</div>
          <div class="some-actions">
            <AwesomeButton
              :icon="faBroom"
              class="remove-awesome-todo"
              @click="removeTodo(item)"
            ></AwesomeButton>
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
import { Todo } from "@Types/types";
import {
  faStickyNote,
  faBroom,
  faSadCry,
} from "@fortawesome/free-solid-svg-icons";
import { default as AwesomeButton } from "@Tools/AwesomeButton.vue";

export default defineComponent({
  props: {},
  components: {
    AwesomeButton,
  },
  setup(props, { emit }) {
    const store = useStore();

    const todos = computed(() => store.state.todos);

    const removeTodo = (todo: Todo) => {
      store.dispatch("removeTodo", todo);
    };

    return {
      todos,
      removeTodo,
      faStickyNote,
      faBroom,
      faSadCry,
    };
  },
});
</script>
<style lang="scss" scoped>
.all-awesome-todos {
  transition: all 0.25s ease;
  & .awesome-todo-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }
  & .awesome-todo-item {
    margin-top: 1rem;
    padding: 2rem;
    width: 80%;
    border: 2px solid #fff;
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
