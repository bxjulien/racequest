import { TraceDirection } from '../../enums/trace-direction.enum';
import { Coordinates } from '../../types/coordinates.type';

export function createWaypoints(
  formatType: number,
  startingPoint: Coordinates,
  direction: TraceDirection = TraceDirection.Clockwise,
): Coordinates[] {
  const waypointsNb = getNumberOfWaypoints(formatType);

  const angleIncrement: number =
    ((2 * Math.PI) / waypointsNb) *
    (direction === TraceDirection.Clockwise ? 1 : -1);

  const waypointDistance: number = formatType / waypointsNb;
  const waypoints: Coordinates[] = [startingPoint];

  for (let i = 1; i <= waypointsNb; i++) {
    const angle: number = i * angleIncrement;
    const lastPoint: Coordinates = waypoints[waypoints.length - 1];
    const newPoint: Coordinates = calculateCoordinates(
      lastPoint,
      waypointDistance,
      angle,
    );
    waypoints.push(newPoint);
  }

  return waypoints;
}

function getNumberOfWaypoints(formatType: number) {
  const shortDistanceThreshold = 5;
  const mediumDistanceThreshold = 10;

  const shortDistanceWaypoints = 4;
  const mediumDistanceWaypoints = 7;
  const longDistanceWaypoints = 11;

  if (formatType <= shortDistanceThreshold) {
    return shortDistanceWaypoints;
  } else if (formatType <= mediumDistanceThreshold) {
    return mediumDistanceWaypoints;
  } else {
    return longDistanceWaypoints;
  }
}

function calculateCoordinates(
  point: Coordinates,
  distance: number,
  angle: number,
): Coordinates {
  const radius: number = 6371; // Rayon de la Terre en km
  const latitudeRad: number = (point[1] * Math.PI) / 180;
  const longitudeRad: number = (point[0] * Math.PI) / 180;
  const angularDistance: number = distance / radius;

  const newLatitudeRad: number = Math.asin(
    Math.sin(latitudeRad) * Math.cos(angularDistance) +
      Math.cos(latitudeRad) * Math.sin(angularDistance) * Math.cos(angle),
  );
  const newLongitudeRad: number =
    longitudeRad +
    Math.atan2(
      Math.sin(angle) * Math.sin(angularDistance) * Math.cos(latitudeRad),
      Math.cos(angularDistance) -
        Math.sin(latitudeRad) * Math.sin(newLatitudeRad),
    );

  const newLatitude: number = (newLatitudeRad * 180) / Math.PI;
  const newLongitude: number = (newLongitudeRad * 180) / Math.PI;

  return [newLongitude, newLatitude];
}
