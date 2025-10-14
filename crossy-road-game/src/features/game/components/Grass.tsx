import type { ReactNode } from "react";
import { tileSize, tilesPerRow } from "../../constants";

export const Grass = ({ rowIndex, children }: { rowIndex: number; children?: ReactNode }) => {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh position={[0, 0, 10]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={0xbaf455} flatShading />
      </mesh>
      {children}
    </group>
  );
};
