import type { MoveDirection } from "../types";
import { endsUpInvalidPosition } from "../utils/endsUpInvalidPosition";

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
  const isValidMove = endsUpInvalidPosition({ rowIndex: state.currentRow, tileIndex: state.currentTile }, [
    ...state.movesQueue,
    direction,
  ]);

  if (!isValidMove) return;

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
