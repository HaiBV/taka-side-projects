import { Map } from "./components/Map";
import { Player } from "./components/Player";
import { Scene } from "./components/Scene";

export const Game = () => {
  return (
    <Scene>
      <Player />
      <Map />
    </Scene>
  );
};
