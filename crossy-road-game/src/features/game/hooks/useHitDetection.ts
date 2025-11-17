import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useGameStore from "../stores/game";
import { state as playerState } from "../stores/player";

export default function useHitDetection(vehicle: React.RefObject<THREE.Group | null>, rowIndex: number) {
  const endGame = useGameStore((state) => state.endGame);
  useFrame(() => {
    if (!vehicle.current) return;
    if (!playerState.ref) return;

    if (rowIndex === playerState.currentRow || rowIndex === playerState.currentRow + 1 || rowIndex === playerState.currentRow - 1) {
      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(vehicle.current);

      const playerBoundingBox = new THREE.Box3();
      playerBoundingBox.setFromObject(playerState.ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        endGame();
      }
    }
  });
}
