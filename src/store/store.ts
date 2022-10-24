import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { Bookmark, Todo } from "@Types/types";
import { v4 as uuidv4 } from "uuid";

// App state
export interface State {
  todos: Todo[];
  bookmarks: Bookmark[];
}

// Store key + simplified store usage
export const storeKey: InjectionKey<Store<State>> = Symbol();
export function useStore() {
  return baseUseStore(storeKey);
}

export const store = createStore<State>({
  state: {
    todos: [],
    bookmarks: [],
  },
  mutations: {
    addTodo(state, todo: Todo) {
      state.todos.push({ ...todo, id: uuidv4() });
    },
    removeTodo(state, todo: Todo) {
      state.todos = state.todos.filter((t: Todo) => t.id != todo.id);
    },
    updateTodo(state, todo: Todo) {
      const index = state.todos.findIndex((t: Todo) => t.id == todo.id);
      if (index > -1) {
        state.todos.splice(index, 1, todo);
      }
    },
    addBookmark(state, bookmark: Bookmark) {
      state.bookmarks.push({ ...bookmark, id: uuidv4() });
    },
    removeBookmark(state, bookmark: Bookmark) {
      state.bookmarks = state.bookmarks.filter(
        (b: Bookmark) => b.id != bookmark.id
      );
    },
    updateBookmark(state, bookmark: Bookmark) {
      const index = state.bookmarks.findIndex(
        (b: Bookmark) => b.id == bookmark.id
      );
      if (index > -1) {
        state.todos.splice(index, 1, bookmark);
      }
    },
  },
  actions: {
    addBookmark({ state, commit }, bookmark: Bookmark) {
      commit("addBookmark", bookmark);
    },
    removeBookmark({ state, commit }, bookmark: Bookmark) {
      commit("removeBookmark", bookmark);
    },
    updateBookmark({ state, commit }, bookmark: Bookmark) {
      commit("updateBookmark", bookmark);
    },
    addTodo({ state, commit }, todo: Todo) {
      commit("addTodo", todo);
    },
    removeTodo({ state, commit }, todo: Todo) {
      commit("removeTodo", todo);
    },
    updateTodo({ state, commit }, todo: Todo) {
      commit("updateTodo", todo);
    },
  },
});
