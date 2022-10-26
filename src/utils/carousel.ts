import { CarouselSlice } from "@Types/types";

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
