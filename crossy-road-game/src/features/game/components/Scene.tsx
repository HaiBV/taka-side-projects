import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

export const Scene = ({ children }: { children: ReactNode }) => {
  return (
    <Canvas
      orthographic={true}
      shadows
      camera={{
        up: [0, 0, 1],
        position: [300, -300, 300],
      }}
    >
      <ambientLight />
      {children}
    </Canvas>
  );
};
