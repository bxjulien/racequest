import { GMapsElevation } from 'src/shared/types/google-maps.type';

export function getTotalElevation(elevations: GMapsElevation[]): number {
  let totalElevation = 0;

  for (let i = 1; i < elevations.length; i++) {
    const elevationGain = elevations[i].elevation - elevations[i - 1].elevation;

    if (elevationGain > 0) totalElevation += elevationGain;
  }

  return Math.round(totalElevation);
}
