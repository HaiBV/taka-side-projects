import { create } from "zustand";
import type { Row } from "../types";
import { generateRows } from "../utils/generateRows";

interface StoreState {
  rows: Row[];
  addRows: () => void;
}

const useMapStore = create<StoreState>((set) => ({
  rows: generateRows(20),
  addRows: () => {
    const newRows = generateRows(20);
    set((state) => ({
      rows: [...state.rows, ...newRows],
    }));
  },
}));

export default useMapStore;
