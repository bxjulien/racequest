CREATE OR REPLACE VIEW races_view AS
  SELECT 
    id,
    longitude_start AS "longitudeStart",
    latitude_start AS "latitudeStart",
    longitude_center AS "longitudeCenter",
    latitude_center AS "latitudeCenter",
    distance AS "distance",
    geojson,
    elevation,
    closing_at AS "closingAt",
    name
  FROM races;