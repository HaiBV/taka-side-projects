import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state, stepCompleted } from "../stores/player";
import { tileSize } from "../constants";

export default function usePlayerAnimation(ref: React.RefObject<THREE.Group | null>) {
  const moveClock = new THREE.Clock(false);

  function setPosition(player: THREE.Group, progress: number) {
    const startX = state.currentTile * tileSize;
    const startY = state.currentRow * tileSize;
    let endX = startX;
    let endY = startY;

    switch (state.movesQueue[0]) {
      case "left":
        endX -= tileSize;
        break;
      case "right":
        endX += tileSize;
        break;
      case "forward":
        endY += tileSize;
        break;
      case "backward":
        endY -= tileSize;
        break;
      default:
        break;
    }

    player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
    player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
    player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
  }

  function setRotation(player: THREE.Group, progress: number) {
    const startRotation = player.rotation.z;
    let endRotation = 0;

    switch (state.movesQueue[0]) {
      case "forward":
        endRotation = 0;
        break;
      case "left":
        endRotation = Math.PI / 2;
        break;
      case "right":
        endRotation = -Math.PI / 2;
        break;
      case "backward":
        endRotation = Math.PI;
        break;
      default:
        break;
    }

    player.rotation.z = THREE.MathUtils.lerp(startRotation, endRotation, progress);
  }

  useFrame(() => {
    if (!ref.current) return;
    if (!state.movesQueue.length) return;
    const player = ref.current;

    if (!moveClock.running) moveClock.start();

    const stepTime = 0.2; // Seconds it takes to take a step
    const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

    setPosition(player, progress);
    setRotation(player, progress);

    // Once a step has ended
    if (progress >= 1) {
      stepCompleted();
      moveClock.stop();
    }
  });
}
