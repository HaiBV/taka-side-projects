import type { Row } from "../types";
import { CarLane } from "./CarLane";
import { Forest } from "./Forest";
import { TruckLane } from "./TruckLane";

export function Row({ rowIndex, rowData }: { rowIndex: number; rowData: Row }) {
  switch (rowData.type) {
    case "forest":
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    case "car":
      return <CarLane rowIndex={rowIndex} rowData={rowData} />;
    case "truck":
      return <TruckLane rowIndex={rowIndex} rowData={rowData} />;
    default:
      return null;
  }
}
