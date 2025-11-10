import type { Row } from "../types";
import { Forest } from "./Forest";

export function Row({ rowIndex, rowData }: { rowIndex: number; rowData: Row }) {
  switch (rowData.type) {
    case "forest":
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    // case "car":
    //   return (
    //     <VehicleRow
    //       rowIndex={rowIndex}
    //       vehicles={rowData.vehicles}
    //       direction={rowData.direction}
    //       speed={rowData.speed}
    //       vehicleType="car"
    //     />
    //   );
    // case "truck":
    //   return (
    //     <VehicleRow
    //       rowIndex={rowIndex}
    //       vehicles={rowData.vehicles}
    //       direction={rowData.direction}
    //       speed={rowData.speed}
    //       vehicleType="truck"
    //     />
    //   );
    default:
      return null;
  }
}
