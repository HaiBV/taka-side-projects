import * as THREE from "three";
import type { MoveDirection } from "../types";
import { endsUpInvalidPosition } from "../utils/endsUpInvalidPosition";
import useGameStore from "./game";
import useMapStore from "./map";

export const state: {
  currentRow: number;
  currentTile: number;
  movesQueue: MoveDirection[];
  ref: THREE.Object3D | null;
} = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
  ref: null,
};

export function queueMove(direction: MoveDirection) {
  const isValidMove = endsUpInvalidPosition({ rowIndex: state.currentRow, tileIndex: state.currentTile }, [...state.movesQueue, direction]);

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

  if (state.currentRow === useMapStore.getState().rows.length - 10) {
    useMapStore.getState().addRows();
  }

  useGameStore.getState().updateScore(state.currentRow);
}

export function setRef(ref: THREE.Object3D) {
  state.ref = ref;
}

export function reset() {
  state.currentRow = 0;
  state.currentTile = 0;
  state.movesQueue = [];

  if (!state.ref) return;
  state.ref.position.x = 0;
  state.ref.position.y = 0;
  state.ref.children[0].rotation.z = 0;
}
