export type Item = {
  id: string;
  title: string;
  userId?: string;
  body?: string;
};

type SavedItem = Item & {
  externalId: string;
};

export type Bookmark = SavedItem & {
  important?: boolean;
};

export type Todo = SavedItem & {
  done?: boolean;
};
