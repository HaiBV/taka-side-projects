import { Bounds } from "@react-three/drei";

export const Player = () => {
  return (
    <Bounds fit clip observe margin={20}>
      <mesh position={[0, 0, 12]} castShadow receiveShadow>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color={0xffffff} flatShading />
      </mesh>
    </Bounds>
  );
};
