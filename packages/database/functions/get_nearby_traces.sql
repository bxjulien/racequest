CREATE OR REPLACE FUNCTION get_nearby_traces(latitude FLOAT, longitude FLOAT, radius FLOAT)
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
    geojson AS "geoJson",
    elevation,
    closing_at AS "closingAt"
  FROM traces
  WHERE ST_DWithin(geohash::geography, ST_Point(longitude, latitude)::geography, radius)
  ORDER BY geohash <-> ST_Point(longitude, latitude)::geography;
$$;