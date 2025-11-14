import * as THREE from "three";
import type { Row, RowType } from "../types";
import { maxTileIndex, minTileIndex } from "../constants";

export function generateRows(amount: number): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < amount; i++) {
    const rowData = generateRow();
    rows.push(rowData);
  }
  return rows;
}

function generateRow(): Row {
  const type: RowType = randomElement(["car", "forest", "truck"]);

  switch (type) {
    case "car":
      return generateCarLaneMetadata();
    case "truck":
      return generateTruckLaneMetadata();
    default:
      return generateForestMetadata();
  }
}

function generateCarLaneMetadata(): Row {
  const ocuppiedTiles = new Set<number>();
  const vehicles = Array.from({ length: 3 }, () => {
    let initialTileIndex: number;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (ocuppiedTiles.has(initialTileIndex));
    ocuppiedTiles.add(initialTileIndex - 1);
    ocuppiedTiles.add(initialTileIndex);
    ocuppiedTiles.add(initialTileIndex + 1);

    const color = randomElement([0xa52523, 0xbdb638, 0x78b14b, 0x3ab7cc, 0xe26d5c, 0x8d6cab]);
    return { initialTileIndex, color };
  });

  const direction = Math.random() < 0.5;
  const speed = randomElement([125, 150, 175, 200, 225, 250]);

  return {
    type: "car",
    direction,
    speed,
    vehicles,
  };
}

function generateTruckLaneMetadata(): Row {
  const ocuppiedTiles = new Set<number>();
  const vehicles = Array.from({ length: 2 }, () => {
    let initialTileIndex: number;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (ocuppiedTiles.has(initialTileIndex));
    ocuppiedTiles.add(initialTileIndex - 2);
    ocuppiedTiles.add(initialTileIndex - 1);
    ocuppiedTiles.add(initialTileIndex);
    ocuppiedTiles.add(initialTileIndex + 1);
    ocuppiedTiles.add(initialTileIndex + 2);

    const color = randomElement([0xa52523, 0xbdb638, 0x78b14b, 0x3ab7cc, 0xe26d5c, 0x8d6cab]);
    return { initialTileIndex, color };
  });

  const direction = Math.random() < 0.5;
  const speed = randomElement([125, 150, 175, 200, 225, 250]);

  return {
    type: "truck",
    direction,
    speed,
    vehicles,
  };
}

function generateForestMetadata(): Row {
  const ocuppiedTiles = new Set<number>();
  const trees = Array.from({ length: 4 }, () => {
    let tileIndex: number;
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (ocuppiedTiles.has(tileIndex));
    ocuppiedTiles.add(tileIndex);

    const height = randomElement([10, 15, 20, 25, 30]);
    return { tileIndex, height };
  });

  return {
    type: "forest",
    trees,
  };
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
