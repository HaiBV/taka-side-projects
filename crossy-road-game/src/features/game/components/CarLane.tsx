import type { Row } from "../types";
import { Car } from "./Car";
import { Road } from "./Road";

export function CarLane({ rowIndex, rowData }: { rowIndex: number; rowData: Extract<Row, { type: "car" }> }) {
  return (
    <Road rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Car
          key={index}
          rowIndex={rowIndex}
          initialTileIndex={vehicle.initialTileIndex}
          direction={rowData.direction}
          speed={rowData.speed}
          color={vehicle.color}
        />
      ))}
    </Road>
  );
}
