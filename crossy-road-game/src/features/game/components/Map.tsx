import useMapStore from "../stores/map";
import { Grass } from "./Grass";
import { Row } from "./Row";

export const Map = () => {
  const rows = useMapStore((state) => state.rows);
  return (
    <>
      <Grass rowIndex={-2} />
      <Grass rowIndex={-1} />
      <Grass rowIndex={0} />
      {rows.map((rowData, index) => (
        <Row key={index} rowIndex={index + 1} rowData={rowData} />
      ))}
    </>
  );
};
