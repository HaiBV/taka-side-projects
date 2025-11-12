import type { MoveDirection } from "../types";

export const state: {
  currentRow: number;
  currentTile: number;
  movesQueue: MoveDirection[];
} = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
};

export function queueMove(direction: MoveDirection) {
  state.movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = state.movesQueue.shift();

  switch (direction) {
    case "forward":
      state.currentRow += 1;
      break;
    case "backward":
      state.currentRow -= 1;
      break;
    case "left":
      state.currentTile -= 1;
      break;
    case "right":
      state.currentTile += 1;
      break;
    default:
      break;
  }
}
