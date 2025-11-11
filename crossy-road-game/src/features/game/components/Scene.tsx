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
      <directionalLight
        position={[-100, -100, 200]}
        up={[0, 0, 1]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-400}
        shadow-camera-right={400}
        shadow-camera-top={400}
        shadow-camera-bottom={-400}
        shadow-camera-near={50}
        shadow-camera-far={400}
      />
      {children}
    </Canvas>
  );
};
