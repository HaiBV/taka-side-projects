import type { ReactNode } from "react";
import { tileSize, tilesPerRow } from "../constants";

export const Road = ({ rowIndex, children }: { rowIndex: number; children?: ReactNode }) => {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={0x454a49} flatShading />
      </mesh>
      {children}
    </group>
  );
};
