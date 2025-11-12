import { useEffect } from "react";
import { queueMove } from "../stores/player";

export default function useEventListeners() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault();
          queueMove("forward");
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          queueMove("backward");
          break;
        case "ArrowLeft":
        case "a":
          e.preventDefault();
          queueMove("left");
          break;
        case "ArrowRight":
        case "d":
          e.preventDefault();
          queueMove("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
