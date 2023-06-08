CREATE OR REPLACE FUNCTION insert_trace(
  _longitude_start NUMERIC,
  _latitude_start NUMERIC,
  _longitude_center NUMERIC,
  _latitude_center NUMERIC,
  _distance NUMERIC,
  _geojson json,
  _direction TEXT,
  _elevation jsonb,
  _closing_in NUMERIC
) RETURNS SETOF traces AS $$
BEGIN
  RETURN QUERY
  INSERT INTO traces (longitude_start, latitude_start, longitude_center, latitude_center, distance, geojson, direction, geohash, elevation, closing_at)
  VALUES (
    _longitude_start,
    _latitude_start,
    _longitude_center,
    _latitude_center,
    _distance,
    _geojson,
    _direction,
    ST_SetSRID(ST_Point(_longitude_start, _latitude_start), 4326)::geometry,
    _elevation,
    CURRENT_DATE + (_closing_in || ' days')::interval
  )
  RETURNING *;
END;
$$ LANGUAGE plpgsql;
