import useGameStore from "../stores/game";

export function Score() {
  const score = useGameStore((state) => state.score);

  return <div id="score">{score}</div>;
}
