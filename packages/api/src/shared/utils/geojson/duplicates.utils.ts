import { Coordinates } from '../../types/coordinates.type';

export function removeDuplicatePoints(
  coordinates: Coordinates[],
): Coordinates[] {
  let result: Coordinates[] = [];
  const duplicates = new Map();
  const startCoord = coordinates[0];
  const endCoord = coordinates[coordinates.length - 1];
  const mainCoords = coordinates.slice(1, -1);

  mainCoords.forEach((coord, index) => {
    const coordStr = JSON.stringify(coord);

    if (duplicates.has(coordStr)) {
      const duplicateIndex = duplicates.get(coordStr);
      const adjacentToStartOrEnd =
        duplicateIndex === 0 || duplicateIndex === mainCoords.length - 1;

      if (!adjacentToStartOrEnd) {
        result.splice(duplicateIndex + 1, index - duplicateIndex - 1);
      }
    } else {
      duplicates.set(coordStr, result.length);
      result.push(coord);
    }
  });

  result = [startCoord, ...result, endCoord];
  return result;
}
