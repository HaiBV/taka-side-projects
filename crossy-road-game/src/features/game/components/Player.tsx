import * as THREE from "three";
import { Bounds } from "@react-three/drei";
import { useEffect, useRef } from "react";
import usePlayerAnimation from "../hooks/usePlayerAnimation";
import { useThree } from "@react-three/fiber";
import { DirectionalLight } from "./DirectionalLight";

export const Player = () => {
  const player = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const camera = useThree((state) => state.camera);
  usePlayerAnimation(player);

  useEffect(() => {
    if (!player.current || !lightRef.current) return;

    player.current.add(camera);
    lightRef.current.target = player.current;
  });

  return (
    <Bounds fit clip observe margin={20}>
      <group ref={player}>
        <group>
          <mesh position={[0, 0, 12]} castShadow receiveShadow>
            <boxGeometry args={[15, 15, 20]} />
            <meshLambertMaterial color={0xffffff} flatShading />
          </mesh>
          <mesh position={[0, 0, 24]} castShadow receiveShadow>
            <boxGeometry args={[2, 4, 2]} />
            <meshLambertMaterial color={0xf0619a} flatShading />
          </mesh>
        </group>
        <DirectionalLight ref={lightRef} />
      </group>
    </Bounds>
  );
};
