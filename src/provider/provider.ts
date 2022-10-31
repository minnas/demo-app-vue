import { Item } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";

const ITEM_STORAGE_KEY = "awesome_items";
/**custom local storage provider*/
export interface IItemStoreProvider {
  updateItem(item: Item): void;
  removeItem(item: Item): void;
  getItems(): Item[];
  addItems(items: Item[]): void;
}
export interface IThemeProvider {
  toggleTheme(): void;
  getCurrentTheme(): string;
  darkMode(): boolean;
  lightMode(): boolean;
}
/**Store */
const options = reactive({
  items: JSON.parse(
    window.localStorage.getItem(ITEM_STORAGE_KEY)?.toString() || "[]"
  ) as Item[],
});
export const ItemStoreProvider: IItemStoreProvider = {
  updateItem(item: Item) {
    const items = this.getItems();
    const index = items.findIndex((t: Item) => t.id === item.id);
    if (index > -1) {
      items.splice(index, 1, item);
    } else {
      items.push({ ...item, id: uuidv4() });
    }
    this.addItems(items);
  },
  removeItem(item: Item) {
    const items = this.getItems();
    const index = items.findIndex((t: Item) => t.id === item.id);
    if (index > -1) {
      items.splice(index, 1);
      this.addItems(items);
    }
  },
  getItems() {
    return options.items;
  },
  addItems(items: Item[]) {
    window.localStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
  },
};
const themeOptions = reactive({
  mode: "dark",
});
export const ThemeProvider: IThemeProvider = {
  toggleTheme() {
    themeOptions.mode = themeOptions.mode == "dark" ? "light" : "dark";
  },
  getCurrentTheme() {
    return themeOptions.mode;
  },
  darkMode() {
    return themeOptions.mode === "dark";
  },
  lightMode() {
    return themeOptions.mode === "light";
  },
};
export const ITEM_PROVIDER_KEY = "itemStoreProvider";
export const THEME_PROVIDER_KEY = "ThemeProvider";
