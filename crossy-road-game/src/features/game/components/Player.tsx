import * as THREE from "three";
import { Bounds } from "@react-three/drei";
import { useRef } from "react";
import usePlayerAnimation from "../hooks/usePlayerAnimation";

export const Player = () => {
  const player = useRef<THREE.Group>(null);
  usePlayerAnimation(player);

  return (
    <Bounds fit clip observe margin={20}>
      <group ref={player}>
        <mesh position={[0, 0, 12]} castShadow receiveShadow>
          <boxGeometry args={[15, 15, 20]} />
          <meshLambertMaterial color={0xffffff} flatShading />
        </mesh>
        <mesh position={[0, 0, 24]} castShadow receiveShadow>
          <boxGeometry args={[2, 4, 2]} />
          <meshLambertMaterial color={0xf0619a} flatShading />
        </mesh>
      </group>
    </Bounds>
  );
};
