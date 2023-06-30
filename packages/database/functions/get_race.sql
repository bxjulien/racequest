CREATE OR REPLACE FUNCTION get_race(_id INT, _longitude FLOAT DEFAULT NULL, _latitude FLOAT DEFAULT NULL)
RETURNS RECORD
LANGUAGE SQL
AS $$
  SELECT 
    id,
    longitude_start AS "longitudeStart",
    latitude_start AS "latitudeStart",
    longitude_center AS "longitudeCenter",
    latitude_center AS "latitudeCenter",
    CASE
      WHEN _longitude IS NULL OR _longitude = 0 OR _latitude IS NULL OR _latitude = 0 THEN NULL
      ELSE ST_Distance(geohash, ST_Point(_longitude, _latitude)::geography) 
    END AS "distanceFrom",
    distance, 
    geojson,
    elevation,
    closing_at AS "closingAt",
    name
  FROM races
  WHERE id = _id
  LIMIT 1
$$;
