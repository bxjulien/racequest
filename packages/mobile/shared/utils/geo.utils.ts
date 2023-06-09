import { MapViewRegion } from "../types/mapview-region.type";

export function calculateRadius(region: MapViewRegion) {
  // Calculate approximate radius based on latitude and longitude deltas
  const latRadian = Math.abs(region.latitudeDelta) * (Math.PI / 180);
  const lonRadian = Math.abs(region.longitudeDelta) * (Math.PI / 180);

  // Approximate radius calculation using the haversine formula
  const radius = Math.sqrt(
    Math.pow(6371 * Math.sin(latRadian / 2), 2) +
      Math.cos(region.latitude * (Math.PI / 180)) *
        Math.cos((region.latitude + region.latitudeDelta) * (Math.PI / 180)) *
        Math.pow(6371 * Math.sin(lonRadian / 2), 2)
  );

  return radius * 1000; // return in meters
}
