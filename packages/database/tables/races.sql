CREATE TABLE races (
    id SERIAL PRIMARY KEY,
    closing_at TIMESTAMPTZ not null,
    direction VARCHAR(50) not null,
    distance NUMERIC not null,
    elevation JSONB not null,
    geojson JSONB not null,
    geohash geography(POINT) not null,
    latitude_center NUMERIC not null,
    latitude_start NUMERIC not null,
    longitude_center NUMERIC not null,
    longitude_start NUMERIC not null,
    name TEXT not null
);

CREATE INDEX races_geohash_index
  ON public.races
  USING GIST (geohash);

CREATE POLICY "races read"
  ON public.races
  FOR SELECT
  USING (true);