<template>
  <div class="all-awesome-todos">
    <div class="awesome-todo-list">
      <div v-if="(todos as Todo[]).length < 1" class="my-awesome-placeholder">
        <font-awesome-icon size="lg" :icon="faSadCry" class="placehoder-icon" />
        <span>{{ t("todos-placeholder") }}</span>
      </div>
      <div
        class="awesome-todo-item"
        v-for="(item, i) of (todos as Todo[])"
        :key="i"
      >
        <div class="awesome-display-mode">
          <font-awesome-icon
            :icon="faStickyNote"
            size="lg"
            class="awesome-icon"
          />
          <div>{{ item.title }}</div>
          <div class="some-actions">
            <awesome-button
              :icon="faBroom"
              class="remove-awesome-todo"
              @click="remove(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Todo } from "@Types/types";
import {
  faStickyNote,
  faBroom,
  faSadCry,
} from "@fortawesome/free-solid-svg-icons";
import { useDispath, useSelector } from "@Store/react-redux/utils";
import { removeTodo } from "@Store/react-redux/dataSlices";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const { t } = useI18n();
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispath();
    const remove = (todo: Todo) => {
      dispatch(removeTodo(todo));
    };

    return {
      todos,
      remove,
      faStickyNote,
      faBroom,
      faSadCry,
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
.all-awesome-todos {
  transition: all 0.25s ease;
  width: 60vw;
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
    border: 2px solid var(--highlight-color-4);
    border-bottom-left-radius: 18px;
    border-top-right-radius: 18px;
    font-size: 1.2rem;
    animation: fadeIn 2s ease-in;
  }
  & .awesome-icon {
    color: var(--highlight-color);
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
    min-height: 100px;
    animation: fadeIn 2s ease-in;
  }
  & .placehoder-icon {
    color: var(--highlight-color);
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
