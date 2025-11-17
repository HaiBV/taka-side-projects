import { Controls } from "./components/Controls";
import { Map } from "./components/Map";
import { Player } from "./components/Player";
import { Result } from "./components/Result";
import { Scene } from "./components/Scene";
import { Score } from "./components/Score";

export const Game = () => {
  return (
    <>
      <Scene>
        <Player />
        <Map />
      </Scene>
      <Score />
      <Controls />
      <Result />
    </>
  );
};
