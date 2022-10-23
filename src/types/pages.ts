import { RouteParamsRaw } from "vue-router";

export interface PageNavigation {
  getCurrentPage(): number;
  hasNextPage(): boolean;
  hasPrevPage(): boolean;
  toNext(extraParams?: RouteParamsRaw): void;
  toPrev(extraParams?: RouteParamsRaw): void;
  toPage(name: string, extraParams?: RouteParamsRaw): void;
  toHome(): void;
  toTodos(): void;
  toBookmarks(): void;
}

/*export interface IPagetemStoreProvider {
  updatePosts(posts: Post[]): void;
  updateBookmarks(posts: Post[]): void;
  getPosts(): Post[];
  getBookmarks(): Post[];
};*/
