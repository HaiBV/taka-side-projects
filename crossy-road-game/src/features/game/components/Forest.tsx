import type { Row } from "../types";
import { Grass } from "./Grass";
import { Tree } from "./Tree";

export function Forest({ rowIndex, rowData }: { rowIndex: number; rowData: Extract<Row, { type: "forest" }> }) {
  return (
    <Grass rowIndex={rowIndex}>
      {rowData.trees.map((tree, index) => (
        <Tree key={index} tileIndex={tree.tileIndex} height={tree.height} />
      ))}
    </Grass>
  );
}
