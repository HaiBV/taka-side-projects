import { useRef } from "react";
import * as THREE from "three";
import { tileSize } from "../constants";
import useVehicleAnimation from "../hooks/useVehicleAnimation";
import { Wheel } from "./Wheel";

export function Truck({
  // rowIndex,
  initialTileIndex,
  direction,
  speed,
  color,
}: {
  rowIndex: number;
  initialTileIndex: number;
  direction: boolean;
  speed: number;
  color: THREE.ColorRepresentation;
}) {
  const car = useRef<THREE.Group>(null);
  useVehicleAnimation(car, direction, speed);

  return (
    <group position-x={initialTileIndex * tileSize} rotation-z={direction ? 0 : Math.PI} ref={car}>
      <mesh position={[-15, 0, 25]} castShadow receiveShadow>
        <boxGeometry args={[70, 35, 35]} />
        <meshLambertMaterial color={0xb4c6fc} />
      </mesh>
      <mesh position={[35, 0, 20]} castShadow receiveShadow>
        <boxGeometry args={[30, 30, 30]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <Wheel x={-35} />
      <Wheel x={5} />
      <Wheel x={37} />
    </group>
  );
}
