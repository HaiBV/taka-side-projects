import type { Row } from "./types";

export const rows: Row[] = [
  {
    type: "forest",
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
      { tileIndex: 5, height: 50 },
    ],
  },
  {
    type: "car",
    direction: false,
    speed: 20,
    vehicles: [{ initialTileIndex: -1, color: 0xff0000 }],
  },
  {
    type: "forest",
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
      { tileIndex: 5, height: 50 },
    ],
  },
  {
    type: "truck",
    direction: false,
    speed: 30,
    vehicles: [{ initialTileIndex: -4, color: 0x00ff00 }],
  },
];
