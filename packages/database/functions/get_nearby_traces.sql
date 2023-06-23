CREATE OR REPLACE FUNCTION get_nearby_traces(latitude FLOAT, longitude FLOAT, radius FLOAT)
RETURNS SETOF RECORD
LANGUAGE SQL
AS $$
  SELECT 
    id, 
    longitude_start,
    latitude_start,
    longitude_center, 
    latitude_center, 
    ST_Distance(geohash, ST_Point(longitude_start, latitude_start)::geography) AS "distance_from",
    distance, 
    geojson,
    elevation,
    closing_at,
    name
  FROM traces
  WHERE ST_DWithin(geohash::geography, ST_Point(longitude, latitude)::geography, radius)
  ORDER BY geohash <-> ST_Point(longitude, latitude)::geography;
$$;