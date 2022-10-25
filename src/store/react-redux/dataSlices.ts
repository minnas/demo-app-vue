import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Bookmark, Todo } from "@Types/types";

const todoSlice = createSlice({
  name: "Todos",
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action) => {
      state.push({ ...action.payload, id: uuidv4() } as Todo);
    },
    removeTodo: (state, action) => {
      return state.filter((t) => t.id != action.payload.id);
    },
    updateTodo: (state, action) => {
      const index = state.findIndex(
        (t) => t.id === (action.payload as Todo).id
      );
      if (index > -1) {
        state.splice(index, 1, action.payload as Todo);
      }
    },
  },
});

const bookmarkSlice = createSlice({
  name: "Bookmarks",
  initialState: [] as Bookmark[],
  reducers: {
    addBookmark: (state, action) => {
      state.push({ ...action.payload, id: uuidv4() } as Bookmark);
    },
    removeBookmark: (state, action) => {
      return state.filter((t) => t.id != action.payload.id);
    },
    updateBookmark: (state, action) => {
      const index = state.findIndex(
        (t) => t.id === (action.payload as Bookmark).id
      );
      if (index > -1) {
        state.splice(index, 1, action.payload as Bookmark);
      }
    },
  },
});

/**reducers */
export const todoReducer = todoSlice.reducer;
export const bookmarkReducer = bookmarkSlice.reducer;
/**actions */
export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;
export const { addBookmark, updateBookmark, removeBookmark } =
  bookmarkSlice.actions;
