import { Store } from "vuex";
import { Bookmark, Todo } from "./types/types";

declare module "@vue/runtime-core" {
  // declares store states
  interface State {
    todos: Todo[];
    bookmarks: Bookmark[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
