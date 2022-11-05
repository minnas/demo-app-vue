import {
  faBook,
  faBookmark,
  faDharmachakra,
  faHome,
  faMessage,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { CarouselSlice, NavItem } from "@Types/types";

export const carouselSlices = (
  width: number,
  height: number,
  cellCount: number
): CarouselSlice[] => {
  const theta = 360 / cellCount;
  const radius = Math.round(width / 2 / Math.tan(Math.PI / cellCount));
  return [...Array(cellCount - 1).keys()].map((n) => {
    return {
      width,
      height,
      angle: theta * n,
      radius,
      theta,
    } as CarouselSlice;
  });
};

export const slides: NavItem[] = [
  {
    path: "/home",
    icon: faHome,
  },
  {
    path: "/todos",
    icon: faStickyNote,
  },
  {
    path: "/posts",
    icon: faBook,
  },
  {
    path: "/bookmarks",
    icon: faBookmark,
  },
  {
    path: "/items",
    icon: faMessage,
  },
  {
    path: "/home",
    icon: faHome,
  },
  {
    path: "/todos",
    icon: faStickyNote,
  },
  {
    path: "/posts",
    icon: faBook,
  },
  {
    path: "/bookmarks",
    icon: faBookmark,
  },
  {
    path: "/carousel",
    icon: faDharmachakra,
  },
];
