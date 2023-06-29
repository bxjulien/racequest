CREATE OR REPLACE FUNCTION get_nearby_races(latitude FLOAT, longitude FLOAT, radius FLOAT)
RETURNS SETOF RECORD
LANGUAGE SQL
AS $$
  SELECT 
    id,
    longitude_start AS "longitudeStart",
    latitude_start AS "latitudeStart",
    longitude_center AS "longitudeCenter",
    latitude_center AS "latitudeCenter",
    ST_Distance(geohash, ST_Point(longitude_start, latitude_start)::geography) AS "distanceFrom",
    distance, 
    geojson,
    elevation,
    closing_at AS "closingAt",
    name
  FROM races
  WHERE ST_DWithin(geohash::geography, ST_Point(longitude, latitude)::geography, radius)
  ORDER BY geohash <-> ST_Point(longitude, latitude)::geography;
$$;