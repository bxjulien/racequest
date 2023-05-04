import { Coordinates } from '../../types/coordinates.type';

export function removeSharpAngles(
  coordinates: Coordinates[],
  angleThreshold = 10,
) {
  let result: Coordinates[] = [...coordinates];
  let changes: boolean;

  do {
    changes = false;
    const tempResult = [result[0]];

    for (let i = 1; i < result.length - 1; i++) {
      const angle = calculateAngle(result[i - 1], result[i], result[i + 1]);

      if (angle > angleThreshold) {
        tempResult.push(result[i]);
      } else {
        changes = true;
      }
    }

    tempResult.push(result[result.length - 1]);
    result = tempResult;
  } while (changes);

  return result;
}

function calculateAngle(
  p1: Coordinates,
  p2: Coordinates,
  p3: Coordinates,
): number {
  const v1 = { x: p1[0] - p2[0], y: p1[1] - p2[1] };
  const v2 = { x: p3[0] - p2[0], y: p3[1] - p2[1] };
  const dotProduct = v1.x * v2.x + v1.y * v2.y;
  const v1Magnitude = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const v2Magnitude = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  const angleInRadians = Math.acos(dotProduct / (v1Magnitude * v2Magnitude));
  return angleInRadians * (180 / Math.PI);
}
