import { Grass } from "./Grass";

export const Map = () => {
  return (
    <>
      <Grass rowIndex={-2} />
      <Grass rowIndex={-1} />
      <Grass rowIndex={0} />
    </>
  );
};
